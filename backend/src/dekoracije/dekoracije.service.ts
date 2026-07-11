import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DodajDekoracijuDto } from './dto/dodaj-dekoraciju.dto';
import { AzurirajDekoracijuDto } from './dto/azuriraj-dekoraciju.dto';

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
        cijenaValuta: dto.cijenaVaulta,
        slikaDekoracija: dto.slikaDekoracije,
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
    const korisnikDekoracija = await this.prisma.korisnikDekoracija.findUnique({
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
    if (!korisnikDekoracija) {
      throw new NotFoundException('Korisnik nema ovu dekoraciju');
    }

    const tipDekoracijeId = korisnikDekoracija.dekoracija.tipDekoracijeId;
    const maxAktivnih = korisnikDekoracija.dekoracija.tipDekoracije.maxAktivnih;

    if (pozicijaPrikaza > maxAktivnih) {
      throw new ConflictException('Neispravna pozicija za ovaj tip dekoracije');
    }

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
      throw new ConflictException('Korsnik već ima ovu dekoraciju');
    }

    return this.prisma.korisnikDekoracija.create({
      data: {
        korisnikId,
        dekoracijaId,
      },
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
}
