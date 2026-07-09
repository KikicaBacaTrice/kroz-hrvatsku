import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DodajKategorijuDto } from './dto/dodaj-kategoriju.dto';
import { AzurirajKategorijuDto } from './dto/azuriraj-kategoriju.dto';

@Injectable()
export class KategorijeService {
  constructor(private readonly prisma: PrismaService) {}

  async dohvatiSve() {
    return this.prisma.kategorijaLokacije.findMany({});
  }

  async dohvatiJednu(id: number) {
    const kategorija = this.prisma.kategorijaLokacije.findUnique({
      where: { kategorijaId: id },
      include: {
        lokacije: true,
        postignuca: true,
      },
    });

    if (!kategorija) {
      throw new NotFoundException('Kategorija nije pronađena');
    }

    return kategorija;
  }

  async dodajKategoriju(dto: DodajKategorijuDto) {
    const novaKategorija = await this.prisma.kategorijaLokacije.create({
      data: {
        naziv: dto.naziv,
        opis: dto.opis,
      },
    });

    return novaKategorija;
  }

  async azurirajKategoriju(id: number, dto: AzurirajKategorijuDto) {
    await this.provjeriPostojiLiKategorija(id);

    return this.prisma.kategorijaLokacije.update({
      where: { kategorijaId: id },
      data: {
        dto,
      },
    });
  }

  async obrisiKategoriju(id: number) {
    await this.provjeriPostojiLiKategorija(id);

    return this.prisma.kategorijaLokacije.delete({
      where: { kategorijaId: id },
    });
  }

  async provjeriPostojiLiKategorija(id: number) {
    const kategorija = await this.prisma.kategorijaLokacije.findUnique({
      where: { kategorijaId: id },
    });

    if (!kategorija) {
      throw new NotFoundException('Kategorija nije pronađena');
    }
    return kategorija;
  }
}
