import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AzuriranjProfilDto } from './dto/azuriraj-profil.dto';

@Injectable()
export class ProfilService {
  constructor(private readonly prisma: PrismaService) {}

  async dohvatiMoj(id: number) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId: id },
      include: {
        korisnik: {
          select: {
            korisnikId: true,
            ulogaId: true,
            ime: true,
            prezime: true,
            korisnickoIme: true,
            email: true,
          },
        },
      },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    const aktivniBedzevi = await this.prisma.korisnikDekoracija.findMany({
      where: {
        korisnikId: id,
        aktivna: true,
        pozicijaPrikaza: {
          in: [1, 2, 3],
        },
        dekoracija: {
          tipDekoracije: {
            naziv: 'Bedž',
          },
        },
      },
      include: {
        dekoracija: true,
      },
    });

    const bedzPozicija1 = aktivniBedzevi.find((b) => b.pozicijaPrikaza === 1);
    const bedzPozicija2 = aktivniBedzevi.find((b) => b.pozicijaPrikaza === 2);
    const bedzPozicija3 = aktivniBedzevi.find((b) => b.pozicijaPrikaza === 3);

    return {
      ...profil,
      bedzPozicija1: bedzPozicija1
        ? this.mapirajBedz(bedzPozicija1.dekoracija)
        : null,
      bedzPozicija2: bedzPozicija2
        ? this.mapirajBedz(bedzPozicija2.dekoracija)
        : null,
      bedzPozicija3: bedzPozicija3
        ? this.mapirajBedz(bedzPozicija3.dekoracija)
        : null,
    };
  }

  async dohvatiJavniProfil(id: number) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId: id },
      select: {
        profilId: true,
        opisProfila: true,
        profilnaSlikaUrl: true,
        razina: true,
        xpBodovi: true,
        korisnik: {
          select: {
            korisnikId: true,
            ime: true,
            prezime: true,
            korisnickoIme: true,
          },
        },
      },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    return profil;
  }

  async dohvatiMojuStatistiku(korisnikId: number) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId },
      select: {
        xpBodovi: true,
        virtualniNovac: true,
        razina: true,
      },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    const brojIzazova = await this.prisma.rijesenaLokacija.count({
      where: { korisnikId },
    });

    const brojPostignuca = await this.prisma.korisnikPostignuce.count({
      where: { korisnikId },
    });

    const brojFotografija = await this.prisma.slikaPosjeta.count({
      where: {
        rijesenaLokacija: {
          korisnikId,
        },
      },
    });

    return {
      razina: profil.razina,
      xp: profil.xpBodovi,
      brojIzazova,
      brojPostignuca,
      brojFotografija,
      brojNovcica: profil.virtualniNovac,
    };
  }

  async dohvatiMojeSlikePosjeta(korisnikId: number) {
    return this.prisma.slikaPosjeta.findMany({
      where: {
        rijesenaLokacija: {
          korisnikId,
        },
      },
      include: {
        rijesenaLokacija: {
          select: {
            datumVrijemePosjeta: true,
            lokacija: {
              select: {
                lokacijaId: true,
                naziv: true,
              },
            },
          },
        },
      },
      orderBy: {
        datumDodavanja: 'desc',
      },
    });
  }

  async azurirajProfil(id: number, dto: AzuriranjProfilDto) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId: id },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.korisnik.update({
        where: { korisnikId: id },
        data: {
          ime: dto.ime,
          prezime: dto.prezime,
          korisnickoIme: dto.korisnickoIme,
        },
      });

      await tx.profil.update({
        where: { korisnikId: id },
        data: {
          opisProfila: dto.opisProfila,
        },
      });

      return this.dohvatiMoj(id);
    });
  }

  async azurirajProfilnuSliku(id: number, url: string) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId: id },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    await this.prisma.profil.update({
      where: { korisnikId: id },
      data: {
        profilnaSlikaUrl: url,
      },
    });

    return this.dohvatiMoj(id);
  }

  async obrisiProfilnuSliku(id: number) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId: id },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    await this.prisma.profil.update({
      where: { korisnikId: id },
      data: {
        profilnaSlikaUrl: null,
      },
    });

    return this.dohvatiMoj(id);
  }

  private mapirajBedz(dekoracija: any) {
    return {
      bedzId: dekoracija.dekoracijaId,
      naziv: dekoracija.naziv,
      opis: dekoracija.opis,
      putanjaIkone: dekoracija.slikaDekoracija,
    };
  }
}
