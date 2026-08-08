import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DodajPovratnuInformacijuDto } from './dto/dodaj-povratnu-informaciju.dto';
import { AzurirajPovratnuInformacijuDto } from './dto/azuriraj-povratnu-informaciju.dto';
import { NagradeService } from 'src/nagrade/nagrade.service';

@Injectable()
export class PovratneInformacijeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly nagradeServis: NagradeService,
  ) {}

  async dohvatiPovratneInformacijeZaLokaciju(lokacijaId: number) {
    await this.provjeriPostojiLiLokacija(lokacijaId);

    return this.prisma.povratnaInformacija.findMany({
      where: { lokacijaId },
      orderBy: {
        datum: 'desc',
      },
      include: {
        korisnik: {
          select: {
            korisnickoIme: true,
            ime: true,
            prezime: true,
          },
        },
      },
    });
  }

  async objaviPovratnuInformaciju(
    lokacijaId: number,
    dto: DodajPovratnuInformacijuDto,
    korisnikId: number,
  ) {
    await this.provjeriPostojiLiLokacija(lokacijaId);

    await this.provjeriDaKorisnikMozeKomentirati(korisnikId, lokacijaId);

    const jePrviKomentarZaLokaciju =
      await this.jePrviKomentarKorisnikaZaLokaciju(korisnikId, lokacijaId);

    const povratnaInformacija = await this.prisma.povratnaInformacija.create({
      data: {
        tekst: dto.tekst,
        ocjena: dto.ocjena,
        korisnikId,
        lokacijaId,
      },
    });

    if (jePrviKomentarZaLokaciju) {
      await this.nagradeServis.dodijeliNagradu(korisnikId, 10, 50);
    }

    await this.izracunajNovuProsjecnuOcjenuIBrojGlasova(lokacijaId);

    return povratnaInformacija;
  }

  async azurirajPovratnuInformaciju(
    lokacijaId: number,
    povratnaInformacijaId: number,
    dto: AzurirajPovratnuInformacijuDto,
    korisnikId: number,
  ) {
    const povratnaInformacija = await this.prisma.povratnaInformacija.findFirst(
      {
        where: { lokacijaId, povratnaInformacijaId, korisnikId },
      },
    );
    if (!povratnaInformacija) {
      throw new NotFoundException('Povratna informacije ne postoji');
    }

    const azurirana = await this.prisma.povratnaInformacija.update({
      where: { povratnaInformacijaId },
      data: dto,
    });

    await this.izracunajNovuProsjecnuOcjenuIBrojGlasova(lokacijaId);

    return azurirana;
  }

  async obrisiPovratnuInformaciju(
    lokacijaId: number,
    povratnaInformacijaId: number,
    korisnikId: number,
  ) {
    const povratnaInformacija = await this.prisma.povratnaInformacija.findFirst(
      {
        where: { lokacijaId, povratnaInformacijaId, korisnikId },
      },
    );
    if (!povratnaInformacija) {
      throw new NotFoundException('Povratna informacije ne postoji');
    }

    const obrisna = await this.prisma.povratnaInformacija.delete({
      where: { povratnaInformacijaId },
    });

    await this.izracunajNovuProsjecnuOcjenuIBrojGlasova(lokacijaId);

    return obrisna;
  }

  async provjeriPostojiLiLokacija(id: number) {
    const lokacija = await this.prisma.lokacija.findUnique({
      where: { lokacijaId: id },
    });
    if (!lokacija) {
      throw new NotFoundException('Lokacija ne postoji');
    }

    return lokacija;
  }

  async izracunajNovuProsjecnuOcjenuIBrojGlasova(lokacijaId: number) {
    const zbroj = await this.prisma.povratnaInformacija.aggregate({
      where: { lokacijaId },
      _avg: {
        ocjena: true,
      },
      _count: {
        ocjena: true,
      },
    });

    return this.prisma.lokacija.update({
      where: { lokacijaId },
      data: {
        prosjecnaOcjena: zbroj._avg.ocjena ?? 0,
        brojOcjena: zbroj._count.ocjena,
      },
    });
  }

  async provjeriDaKorisnikMozeKomentirati(
    korisnikId: number,
    lokacijaId: number,
  ) {
    const jeLiRijesena = await this.prisma.rijesenaLokacija.findUnique({
      where: {
        korisnikId_lokacijaId: {
          korisnikId,
          lokacijaId,
        },
      },
    });

    if (!jeLiRijesena) {
      throw new ForbiddenException(
        'Povratnu informaciju može ostaviti samo korisnik koji je riješio/bio na lokaciji',
      );
    }
  }

  async jePrviKomentarKorisnikaZaLokaciju(
    korisnikId: number,
    lokacijaId: number,
  ) {
    const brojPostojecihKomentara = await this.prisma.povratnaInformacija.count(
      {
        where: { korisnikId, lokacijaId },
      },
    );

    return brojPostojecihKomentara === 0;
  }
}
