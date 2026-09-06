import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AzurirajKorisnikaDto } from './dto/azuriraj-korisnika.dto';
import { PovratneInformacijeService } from 'src/povratne-informacije/povratne-informacije.service';

@Injectable()
export class KorisniciService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly povratneInformacijeService: PovratneInformacijeService,
  ) {}

  async dohvatiSve() {
    return this.prisma.korisnik.findMany({
      select: {
        korisnikId: true,
        ime: true,
        prezime: true,
        korisnickoIme: true,
        ulogaId: true,
        uloga: {
          select: {
            naziv: true,
          },
        },
        profil: {
          select: {
            virtualniNovac: true,
          },
        },
      },
      orderBy: {
        korisnikId: 'asc',
      },
    });
  }

  async dohvatiJednog(id: number) {
    const korisnik = await this.prisma.korisnik.findUnique({
      where: { korisnikId: id },
      select: {
        korisnikId: true,
        ime: true,
        prezime: true,
        korisnickoIme: true,
        email: true,
        ulogaId: true,
      },
    });

    if (!korisnik) {
      throw new NotFoundException('Korisnik nije pronađen');
    }

    return korisnik;
  }

  async azuriraj(id: number, dto: AzurirajKorisnikaDto) {
    await this.provjeriPostojiLiKorisnik(id);

    return this.prisma.korisnik.update({
      where: { korisnikId: id },
      data: dto,
    });
  }

  async azurirajNovacKorisnika(korisnikId: number, virtualniNovac: number) {
    return this.prisma.profil.update({
      where: {
        korisnikId,
      },
      data: {
        virtualniNovac,
      },
    });
  }

  async obrisi(id: number) {
    const korisnik = await this.prisma.korisnik.findUnique({
      where: { korisnikId: id },
    });

    if (!korisnik) {
      throw new NotFoundException('Korisnik nije pronađen');
    }

    if (korisnik.ulogaId === 2) {
      throw new ForbiddenException('Admin korisnik se ne može obrisati');
    }

    const lokacijeZaOsvjeziti = await this.prisma.povratnaInformacija.findMany({
      where: { korisnikId: id },
      select: {
        lokacijaId: true,
      },
      distinct: ['lokacijaId'],
    });

    const obrisaniKorisnik = await this.prisma.korisnik.delete({
      where: { korisnikId: id },
    });

    for (const zapis of lokacijeZaOsvjeziti) {
      await this.povratneInformacijeService.izracunajNovuProsjecnuOcjenuIBrojGlasova(
        zapis.lokacijaId,
      );
    }

    return obrisaniKorisnik;
  }

  async provjeriPostojiLiKorisnik(id: number) {
    const korisnik = await this.prisma.korisnik.findUnique({
      where: { korisnikId: id },
    });

    if (!korisnik) {
      throw new NotFoundException('Korisnik nije pronađena');
    }
    return korisnik;
  }
}
