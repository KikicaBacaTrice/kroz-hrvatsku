import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AzuriranjProfilDto } from './dto/azuriraj-profil.dto';
import { Prisma } from 'generated/prisma/client';

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

    return profil;
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

  async kreirajProfil(id: number) {
    const korisnik = await this.prisma.korisnik.findUnique({
      where: { korisnikId: id },
    });

    if (!korisnik) {
      throw new NotFoundException('Korisnik nije pronađen');
    }

    try {
      return this.prisma.profil.create({
        data: {
          korisnikId: id,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('Profil već postoji');
      }

      throw e;
    }
  }

  async azurirajProfil(id: number, dto: AzuriranjProfilDto) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId: id },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    return await this.prisma.profil.update({
      where: { korisnikId: id },
      data: {
        opisProfila: dto.opisProfila,
      },
    });
  }

  async azurirajProfilnuSliku(id: number, url: string) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId: id },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    return this.prisma.profil.update({
      where: { korisnikId: id },
      data: {
        profilnaSlikaUrl: url,
      },
    });
  }

  async obrisiProfilnuSliku(id: number) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId: id },
    });

    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    return this.prisma.profil.update({
      where: { korisnikId: id },
      data: {
        profilnaSlikaUrl: null,
      },
    });
  }
}
