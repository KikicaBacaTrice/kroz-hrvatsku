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
    });
  }

  async objaviPovratnuInformaciju(
    lokacijaId: number,
    dto: DodajPovratnuInformacijuDto,
    korisnikId: number,
  ) {
    await this.provjeriPostojiLiLokacija(lokacijaId);

    const rijesenaLokacija = this.prisma.rijesenaLokacija.findUnique({
      where: {
        korisnikId_lokacijaId: {
          korisnikId,
          lokacijaId,
        },
      },
    });
    if (!rijesenaLokacija) {
      throw new ForbiddenException(
        'Povratnu informaciju može ostaviti samo korisnik koji je riješio/bio na lokaciji',
      );
    }

    const povratnaInformacija = await this.prisma.povratnaInformacija.create({
      data: {
        tekst: dto.tekst,
        ocjena: dto.ocjena,
        korisnikId,
        lokacijaId,
      },
    });

    await this.nagradeServis.dodijeliNagradu(korisnikId, 10, 50);

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

    return await this.prisma.povratnaInformacija.update({
      where: { povratnaInformacijaId, korisnikId },
      data: dto,
    });
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

    return await this.prisma.povratnaInformacija.delete({
      where: { povratnaInformacijaId, korisnikId },
    });
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
}
