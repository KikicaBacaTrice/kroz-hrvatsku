import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AzurirajKorisnikaDto } from './dto/azuriraj-korisnika.dto';

@Injectable()
export class KorisniciService {
  constructor(private readonly prisma: PrismaService) {}

  async dohvatiSve() {
    return this.prisma.korisnik.findMany({
      select: {
        korisnikId: true,
        ime: true,
        prezime: true,
        korisnickoIme: true,
        email: true,
        ulogaId: true,
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

  async obrisi(id: number) {
    await this.provjeriPostojiLiKorisnik(id);

    return this.prisma.korisnik.delete({
      where: { korisnikId: id },
    });
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
