import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FiltrirajLokacijeDto } from './dto/filtriraj-lokacije.dto';
import { DodajLokacijaDto } from './dto/dodaj-lokacije.dto';
import { AzurirajLokacijuDto } from './dto/azuriraj-lokacije.dto';

@Injectable()
export class LokacijeService {
  constructor(private readonly prisma: PrismaService) {}

  async dohvatiSve(filter?: FiltrirajLokacijeDto) {
    return this.prisma.lokacija.findMany({
      where: {
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
      },
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

  async dodajLokaciju(dto: DodajLokacijaDto) {
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
        dodaoKorisnikId: dto.dodaoKorisnikId,
        kategorijaId: dto.kategorijaId,
      },
    });

    return novaLokacija;
  }

  async azurirajLokaciju(id: number, dto: AzurirajLokacijuDto) {
    await this.provjeriPostojiLiLokacija(id);

    return this.prisma.lokacija.update({
      where: { lokacijaId: id },
      data: dto,
    });
  }

  async obrisi(id: number) {
    await this.provjeriPostojiLiLokacija(id);

    return this.prisma.lokacija.delete({
      where: { lokacijaId: id },
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
}
