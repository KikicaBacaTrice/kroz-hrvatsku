import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DodajDekoracijuDto } from './dto/dodaj-dekoraciju.dto';
import { AzurirajDekoracijuDto } from './dto/azuriraj-dekoraciju.dto';
import { DodajTipDekoracijeDto } from './dto/dodaj-tip-dekoracije.dto';
import { AzurirajTipDekoracijeDto } from './dto/azuriraj-tip-dekoracije.dto';

@Injectable()
export class DekoracijeService {
  constructor(private readonly prisma: PrismaService) {}

  async dohvatiSve() {
    return this.prisma.dekoracija.findMany({
      include: {
        tipDekoracije: true,
        nacinOtkljucavanja: true,
      },
      orderBy: {
        naziv: 'asc',
      },
    });
  }

  async dohvatiJednu(id: number) {
    const dekoracija = await this.prisma.dekoracija.findUnique({
      where: { dekoracijaId: id },
      include: {
        tipDekoracije: true,
        nacinOtkljucavanja: true,
      },
    });
    if (!dekoracija) {
      throw new NotFoundException('Dekoracije nije pronađena');
    }

    return dekoracija;
  }

  async dodajDekoraciju(dto: DodajDekoracijuDto) {
    return this.prisma.dekoracija.create({
      data: {
        naziv: dto.naziv,
        opis: dto.opis,
        cijenaValuta: dto.cijenaValuta,
        slikaDekoracija: dto.slikaDekoracija,
        tipDekoracijeId: dto.tipDekoracijeId,
        nacinOtkljucavanjaId: dto.nacinOtkljucavanjaId,
      },
    });
  }

  async azurirajDekoraciju(id: number, dto: AzurirajDekoracijuDto) {
    await this.provjeriPostojiLiDekoracija(id);

    return this.prisma.dekoracija.update({
      where: { dekoracijaId: id },
      data: dto,
    });
  }

  async obrisiDekoraciju(id: number) {
    await this.provjeriPostojiLiDekoracija(id);

    return this.prisma.dekoracija.delete({
      where: { dekoracijaId: id },
    });
  }

  async dohvatiMojeDekoracije(korisnikId: number) {
    return this.prisma.korisnikDekoracija.findMany({
      where: { korisnikId },
      include: {
        dekoracija: {
          include: {
            tipDekoracije: true,
            nacinOtkljucavanja: true,
          },
        },
      },
      orderBy: [{ aktivna: 'desc' }, { datumDobivanja: 'desc' }],
    });
  }
  async aktivirajDekoraciju(
    korisnikId: number,
    dekoracijaId: number,
    pozicijaPrikaza: number,
  ) {
    const korisnikDekoracija =
      await this.dohvatiKorisnikovuDekoracijuZaAktivaciju(
        korisnikId,
        dekoracijaId,
      );

    const tipDekoracijeId = korisnikDekoracija.dekoracija.tipDekoracijeId;
    const maxAktivnih = korisnikDekoracija.dekoracija.tipDekoracije.maxAktivnih;

    this.provjeriValjanostPozicijePrikaza(pozicijaPrikaza, maxAktivnih);

    await this.deaktivirajAktivnuDekoracijuNaPoziciji(
      korisnikId,
      pozicijaPrikaza,
      tipDekoracijeId,
    );

    return this.prisma.korisnikDekoracija.update({
      where: {
        korisnikId_dekoracijaId: {
          korisnikId,
          dekoracijaId,
        },
      },
      data: {
        aktivna: true,
        pozicijaPrikaza,
      },
      include: {
        dekoracija: {
          include: {
            tipDekoracije: true,
          },
        },
      },
    });
  }

  async deaktivirajDekoraciju(korisnikId: number, dekoracijaId: number) {
    const korisnikDekoracija = await this.prisma.korisnikDekoracija.findUnique({
      where: {
        korisnikId_dekoracijaId: {
          korisnikId,
          dekoracijaId,
        },
      },
    });
    if (!korisnikDekoracija) {
      throw new NotFoundException('Korisnik nema ovu dekoraciju');
    }

    return this.prisma.korisnikDekoracija.update({
      where: {
        korisnikId_dekoracijaId: {
          korisnikId,
          dekoracijaId,
        },
      },
      data: {
        aktivna: false,
        pozicijaPrikaza: null,
      },
    });
  }

  async kupiDekoraciju(korisnikId: number, dekoracijaId: number) {
    const dekoracija = await this.prisma.dekoracija.findUnique({
      where: { dekoracijaId },
    });
    if (!dekoracija) {
      throw new NotFoundException('Dekoracija nije pronađena');
    }

    if (dekoracija.cijenaValuta === null) {
      throw new ConflictException('Ova dekoracija se ne može kupiti');
    }

    const postojecaDekoracija = await this.prisma.korisnikDekoracija.findUnique(
      {
        where: {
          korisnikId_dekoracijaId: {
            korisnikId,
            dekoracijaId,
          },
        },
      },
    );
    if (postojecaDekoracija) {
      throw new ConflictException('Korisnik već ima ovu dekoraciju');
    }

    return this.prisma.$transaction(async (tx) => {
      const azuriraniProfil = await tx.profil.updateMany({
        where: {
          korisnikId,
          virtualniNovac: {
            gte: dekoracija.cijenaValuta!,
          },
        },
        data: {
          virtualniNovac: {
            decrement: dekoracija.cijenaValuta!,
          },
        },
      });

      if (azuriraniProfil.count === 0) {
        throw new ConflictException('Korisnik nema dovoljno virtualnog novca');
      }

      return tx.korisnikDekoracija.create({
        data: {
          korisnikId,
          dekoracijaId,
        },
        include: {
          dekoracija: {
            include: {
              tipDekoracije: true,
              nacinOtkljucavanja: true,
            },
          },
        },
      });
    });
  }

  async dodijeliDekoracijuKorisniku(korisnikId: number, dekoracijaId: number) {
    await this.provjeriPostojiLiDekoracija(dekoracijaId);

    const vecPostoji = await this.prisma.korisnikDekoracija.findUnique({
      where: {
        korisnikId_dekoracijaId: {
          korisnikId,
          dekoracijaId,
        },
      },
    });
    if (vecPostoji) {
      return vecPostoji;
    }

    return this.prisma.korisnikDekoracija.create({
      data: {
        korisnikId,
        dekoracijaId,
      },
    });
  }

  async dohvatiTipDekoracije() {
    return this.prisma.tipDekoracije.findMany({
      orderBy: {
        naziv: 'asc',
      },
    });
  }

  async dohvatiDekoracijeZaTip(id: number) {
    const tipDekoracije = await this.prisma.tipDekoracije.findUnique({
      where: { tipDekoracijeId: id },
      include: {
        dekoracije: true,
      },
    });
    if (!tipDekoracije) {
      throw new NotFoundException('Tip dekoracije nije pronađen');
    }

    return tipDekoracije;
  }

  async dodajTipDekoracije(dto: DodajTipDekoracijeDto) {
    return this.prisma.tipDekoracije.create({
      data: {
        naziv: dto.naziv,
        maxAktivnih: dto.maxAktivnih,
      },
    });
  }

  async azurirajTipDekoracije(id: number, dto: AzurirajTipDekoracijeDto) {
    await this.provjeriPostojiLiTipDekoracije(id);

    return this.prisma.tipDekoracije.update({
      where: { tipDekoracijeId: id },
      data: dto,
    });
  }

  async obrisiTipDekoracije(id: number) {
    await this.provjeriPostojiLiTipDekoracije(id);

    return this.prisma.tipDekoracije.delete({
      where: { tipDekoracijeId: id },
    });
  }

  async provjeriPostojiLiDekoracija(id: number) {
    const dekoracija = await this.prisma.dekoracija.findUnique({
      where: { dekoracijaId: id },
    });

    if (!dekoracija) {
      throw new NotFoundException('Dekoracija nije pronađena');
    }

    return dekoracija;
  }

  async provjeriPostojiLiTipDekoracije(id: number) {
    const tipDekoracije = await this.prisma.tipDekoracije.findUnique({
      where: { tipDekoracijeId: id },
    });

    if (!tipDekoracije) {
      throw new NotFoundException('Tip dekoracije nije pronađen');
    }

    return tipDekoracije;
  }

  async dohvatiKorisnikovuDekoracijuZaAktivaciju(
    korisnikId: number,
    dekoracijaId: number,
  ) {
    const imaLiKorisnikDekoraciju =
      await this.prisma.korisnikDekoracija.findUnique({
        where: {
          korisnikId_dekoracijaId: {
            korisnikId,
            dekoracijaId,
          },
        },
        include: {
          dekoracija: {
            include: {
              tipDekoracije: {
                select: {
                  tipDekoracijeId: true,
                  maxAktivnih: true,
                },
              },
            },
          },
        },
      });
    if (!imaLiKorisnikDekoraciju) {
      throw new NotFoundException('Korisnik nema ovu dekoraciju');
    }

    return imaLiKorisnikDekoraciju;
  }

  provjeriValjanostPozicijePrikaza(
    pozicijaPrikaza: number,
    maxAktivnih: number,
  ) {
    if (pozicijaPrikaza > maxAktivnih) {
      throw new ConflictException('Neispravna pozicija za ovaj tip dekoracije');
    }
  }

  async deaktivirajAktivnuDekoracijuNaPoziciji(
    korisnikId: number,
    pozicijaPrikaza: number,
    tipDekoracijeId: number,
  ) {
    await this.prisma.korisnikDekoracija.updateMany({
      where: {
        korisnikId,
        aktivna: true,
        pozicijaPrikaza,
        dekoracija: {
          tipDekoracijeId,
        },
      },
      data: {
        aktivna: false,
        pozicijaPrikaza: null,
      },
    });
  }
}
