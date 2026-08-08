import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FiltrirajLokacijeDto } from './dto/filtriraj-lokacije.dto';
import { DodajLokacijaDto } from './dto/dodaj-lokacije.dto';
import { AzurirajLokacijuDto } from './dto/azuriraj-lokacije.dto';
import { DodajSlikuDto } from './dto/dodaj-sliku.dto';
import { AzurirajSlikuLokacijeDto } from './dto/azuriraj-sliku-lokacije.dto';
import { NagradeService } from 'src/nagrade/nagrade.service';
import { Prisma } from '@prisma/client';

type LokacijaZaRjesavanje = {
  lokacijaId: number;
  kategorijaId: number;
  nagradaXp: number;
  nagradaValuta: number;
  jePopularna: boolean;
};
@Injectable()
export class LokacijeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly nagradeServis: NagradeService,
  ) {}

  async dohvatiSve(filter?: FiltrirajLokacijeDto) {
    const prismaWhereFilter = this.kreirajFilterLokacija(filter);

    return this.prisma.lokacija.findMany({
      where: prismaWhereFilter,
      include: {
        kategorija: true,
        slikeLokacije: true,
      },
      orderBy: {
        datumDodavanja: 'desc',
      },
    });
  }

  async dohvatiJednu(id: number) {
    const lokacija = await this.prisma.lokacija.findUnique({
      where: { lokacijaId: id },
      include: {
        kategorija: true,
        slikeLokacije: true,
      },
    });

    if (!lokacija) {
      throw new NotFoundException('Lokacija nije pronađena');
    }

    return lokacija;
  }

  async dohvatiSlikeZaLokaciju(id: number) {
    await this.provjeriPostojiLiLokacija(id);

    return this.prisma.slikaLokacije.findMany({
      where: { lokacijaId: id },
      orderBy: [{ glavna: 'desc' }, { datumDodavanja: 'desc' }],
    });
  }

  async dohvatiRijeseneLokacije(korisnikId: number) {
    return this.prisma.rijesenaLokacija.findMany({
      where: { korisnikId },
      select: {
        rijesenaLokacijaId: true,
        datumVrijemePosjeta: true,
        brojOsvojeneValute: true,
        brojOsvojenihXp: true,
        lokacija: {
          select: {
            naziv: true,
            slikeLokacije: {
              where: { glavna: true },
              select: {
                slikaId: true,
                putanjaSlike: true,
                opisSlike: true,
              },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        datumVrijemePosjeta: 'desc',
      },
    });
  }

  async dohvatiRijesenuLokaciju(
    rijesenaLokacijaId: number,
    korisnikId: number,
  ) {
    const rijesenaLokacija = await this.prisma.rijesenaLokacija.findFirst({
      where: { rijesenaLokacijaId, korisnikId },
      include: {
        lokacija: {
          include: {
            kategorija: true,
            slikeLokacije: true,
          },
        },
        slikePosjeta: true,
      },
    });
    if (!rijesenaLokacija) {
      throw new NotFoundException('Riješena lokacija nije pronađena');
    }

    return rijesenaLokacija;
  }

  async dodajLokaciju(dto: DodajLokacijaDto, korisnikId: number) {
    const novaLokacija = await this.prisma.lokacija.create({
      data: {
        naziv: dto.naziv,
        opis: dto.opis,
        adresa: dto.adresa,
        grad: dto.grad,
        zupanija: dto.zupanija,
        ulaznicaCijena: dto.ulaznicaCijena,
        geoSirina: dto.geoSirina,
        geoDuzina: dto.geoDuzina,
        nagradaXp: dto.nagradaXp,
        nagradaValuta: dto.nagradaValuta,
        dodaoKorisnikId: korisnikId,
        kategorijaId: dto.kategorijaId,
      },
    });

    return novaLokacija;
  }

  async dodajSlikuZaLokaciju(id: number, dto: DodajSlikuDto) {
    await this.provjeriPostojiLiLokacija(id);

    if (dto.glavna) {
      await this.deaktivirajTrenutnuGlavnuSliku(id);
    }

    return this.prisma.slikaLokacije.create({
      data: {
        putanjaSlike: dto.putanjaSlike,
        opisSlike: dto.opisSlike,
        glavna: dto.glavna ?? false,
        lokacijaId: id,
      },
    });
  }

  async zabiljeziRijesenuLokaciju(lokacijaId: number, korisnikId: number) {
    const lokacija = await this.dohvatiLokacijuZaRjesavanje(lokacijaId);

    await this.provjeriDaNijeVecRijesena(lokacijaId, korisnikId);

    const { xpDodati, valutaDodati } =
      this.izracunajNagraduZaLokaciju(lokacija);

    const rijesenaLokacija = await this.spremiRijesenuLokaciju(
      lokacijaId,
      korisnikId,
      xpDodati,
      valutaDodati,
    );

    await this.nagradeServis.dodijeliNagradu(
      korisnikId,
      xpDodati,
      valutaDodati,
    );
    await this.nagradeServis.provjeriINapraviPostignuce(
      korisnikId,
      lokacija.kategorijaId,
    );

    return rijesenaLokacija;
  }

  async azurirajLokaciju(id: number, dto: AzurirajLokacijuDto) {
    await this.provjeriPostojiLiLokacija(id);

    return this.prisma.lokacija.update({
      where: { lokacijaId: id },
      data: dto,
    });
  }

  async azurirajSlikuZaLokaciju(
    lokacijaId: number,
    slikaId: number,
    dto: AzurirajSlikuLokacijeDto,
  ) {
    await this.provjeriPostojiLiLokacija(lokacijaId);

    const slika = await this.prisma.slikaLokacije.findFirst({
      where: {
        slikaId,
        lokacijaId,
      },
    });
    if (!slika) {
      throw new NotFoundException('Slika za ovu lokaciju nije pronađena');
    }

    if (dto.glavna) {
      await this.prisma.slikaLokacije.updateMany({
        where: {
          lokacijaId,
          glavna: true,
          slikaId: {
            not: slikaId,
          },
        },
        data: {
          glavna: false,
        },
      });
    }

    return this.prisma.slikaLokacije.update({
      where: { slikaId },
      data: dto,
    });
  }

  async izmijeniPopularnostLokacija(id: number) {
    const lokacija = await this.provjeriPostojiLiLokacija(id);

    return this.prisma.lokacija.update({
      where: {
        lokacijaId: id,
      },
      data: {
        jePopularna: !lokacija.jePopularna,
      },
    });
  }

  async obrisi(id: number) {
    await this.provjeriPostojiLiLokacija(id);

    return this.prisma.lokacija.delete({
      where: { lokacijaId: id },
    });
  }

  async obrisiSlikuZaLokaciju(lokacijaId: number, slikaId: number) {
    await this.provjeriPostojiLiLokacija(lokacijaId);

    const slika = await this.prisma.slikaLokacije.findFirst({
      where: {
        slikaId,
        lokacijaId,
      },
    });
    if (!slika) {
      throw new NotFoundException('SLika za ovu lokaciju nije pronađena');
    }

    return this.prisma.slikaLokacije.delete({
      where: { slikaId },
    });
  }

  async provjeriPostojiLiLokacija(id: number) {
    const lokacija = await this.prisma.lokacija.findUnique({
      where: { lokacijaId: id },
    });

    if (!lokacija) {
      throw new NotFoundException('Lokacija nije pronađena');
    }
    return lokacija;
  }

  async dohvatiLokacijuZaRjesavanje(lokacijaId: number) {
    const lokacija = await this.prisma.lokacija.findUnique({
      where: { lokacijaId },
      select: {
        lokacijaId: true,
        kategorijaId: true,
        nagradaValuta: true,
        nagradaXp: true,
        jePopularna: true,
      },
    });
    if (!lokacija) {
      throw new NotFoundException('Lokacija nije pronađena');
    }
    return lokacija;
  }

  async provjeriDaNijeVecRijesena(lokacijaId: number, korisnikId: number) {
    const vecRijesena = await this.prisma.rijesenaLokacija.findUnique({
      where: {
        korisnikId_lokacijaId: {
          korisnikId,
          lokacijaId,
        },
      },
    });
    if (vecRijesena) {
      throw new ConflictException('Lokacija je već riješena');
    }
  }

  async spremiRijesenuLokaciju(
    lokacijaId: number,
    korisnikId: number,
    xpDodati: number,
    valutaDodati: number,
  ) {
    return this.prisma.rijesenaLokacija.create({
      data: {
        korisnikId,
        lokacijaId,
        brojOsvojenihXp: xpDodati,
        brojOsvojeneValute: valutaDodati,
      },
      include: {
        lokacija: {
          include: {
            kategorija: true,
            slikeLokacije: true,
          },
        },
      },
    });
  }

  izracunajNagraduZaLokaciju(lokacija: LokacijaZaRjesavanje) {
    const xpDodati = lokacija.jePopularna
      ? lokacija.nagradaXp * 2
      : lokacija.nagradaXp;
    const valutaDodati = lokacija.jePopularna
      ? lokacija.nagradaValuta * 2
      : lokacija.nagradaValuta;

    return { xpDodati, valutaDodati };
  }

  async deaktivirajTrenutnuGlavnuSliku(lokacijaId: number) {
    await this.prisma.slikaLokacije.updateMany({
      where: { lokacijaId, glavna: true },
      data: { glavna: false },
    });
  }

  kreirajFilterLokacija(
    filter?: FiltrirajLokacijeDto,
  ): Prisma.LokacijaWhereInput {
    return {
      ...(filter?.grad && {
        grad: {
          contains: filter.grad,
          mode: 'insensitive',
        },
      }),
      ...(filter?.zupanija && {
        zupanija: {
          contains: filter.zupanija,
          mode: 'insensitive',
        },
      }),
      ...(filter?.kategorija && {
        kategorija: {
          naziv: {
            equals: filter.kategorija,
            mode: 'insensitive',
          },
        },
      }),
      ...(filter?.pretraziNaziv && {
        OR: [
          {
            naziv: {
              contains: filter.pretraziNaziv,
              mode: 'insensitive',
            },
          },
          {
            opis: {
              contains: filter.pretraziNaziv,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };
  }
}
