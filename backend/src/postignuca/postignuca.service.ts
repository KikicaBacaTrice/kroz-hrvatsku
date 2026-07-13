import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DodajPostignuceDto } from './dto/dodaj-postignuce.dto';
import { AzurirajPostignuceDto } from './dto/azuriraj-postignuce.dto';

@Injectable()
export class PostignucaService {
  constructor(private readonly prisma: PrismaService) {}

  async dohvatiSva() {
    return this.prisma.postignuce.findMany({
      include: {
        kategorija: true,
        dekoracija: true,
      },
      orderBy: { brojPotrebnihLokacija: 'asc' },
    });
  }

  async dohvatiJedno(id: number) {
    const postignuce = await this.prisma.postignuce.findMany({
      where: { postignuceId: id },
      include: {
        kategorija: true,
        dekoracija: true,
      },
    });
    if (!postignuce) {
      throw new NotFoundException('Postignuće nije pronađeno');
    }

    return postignuce;
  }

  async dodajPostignuce(dto: DodajPostignuceDto) {
    return this.prisma.postignuce.create({
      data: {
        naziv: dto.naziv,
        opis: dto.opis,
        brojPotrebnihLokacija: dto.brojPotrebnihLokacija,
        nagradaXp: dto.nagradaXp,
        nagradaValuta: dto.nagradaValuta,
        kategorijaId: dto.kategorijaId,
        dekoracijaId: dto.dekoracijaId,
      },
    });
  }

  async azurirajPostignuce(id: number, dto: AzurirajPostignuceDto) {
    await this.provjeriPostojiLiPostignuce(id);

    return this.prisma.postignuce.update({
      where: { postignuceId: id },
      data: dto,
    });
  }

  async obrisiPostignuce(id: number) {
    await this.provjeriPostojiLiPostignuce(id);

    return this.prisma.postignuce.delete({
      where: { postignuceId: id },
    });
  }

  async provjeriPostojiLiPostignuce(id: number) {
    const postignuce = await this.prisma.postignuce.findUnique({
      where: { postignuceId: id },
    });

    if (!postignuce) {
      throw new NotFoundException('Postignuće nije pronađeno');
    }

    return postignuce;
  }
}
