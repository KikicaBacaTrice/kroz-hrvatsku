import { Injectable, NotFoundException } from '@nestjs/common';
import { DekoracijeService } from 'src/dekoracije/dekoracije.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NagradeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dekoracijeServis: DekoracijeService,
  ) {}

  async dohvatiMojeNagrade(korisnikId: number) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId },
      select: {
        razina: true,
        xpBodovi: true,
        virtualniNovac: true,
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

  async dohvatiMojaPostignuca(korisnikId: number) {
    return this.prisma.korisnikPostignuce.findMany({
      where: { korisnikId },
      include: {
        postignuce: {
          include: {
            kategorija: true,
            dekoracija: true,
          },
        },
      },
      orderBy: {
        datumOtkljucavanja: 'desc',
      },
    });
  }

  async dodijeliNagradu(korisnikId: number, xp: number, valuta: number) {
    await this.prisma.profil.update({
      where: { korisnikId },
      data: {
        xpBodovi: {
          increment: xp,
        },
        virtualniNovac: {
          increment: valuta,
        },
      },
    });

    await this.azurirajRazinuAkoTreba(korisnikId);
  }

  async azurirajRazinuAkoTreba(korisnikId: number) {
    const profil = await this.prisma.profil.findUnique({
      where: { korisnikId },
      select: {
        profilId: true,
        xpBodovi: true,
        razina: true,
      },
    });
    if (!profil) {
      throw new NotFoundException('Profil nije pronađen');
    }

    let novaRazina = profil.razina;
    let noviXpBodovi = profil.xpBodovi;

    while (noviXpBodovi >= 100) {
      novaRazina += 1;
      noviXpBodovi -= 100;
    }

    if (novaRazina !== profil.razina || noviXpBodovi !== profil.xpBodovi) {
      await this.prisma.profil.update({
        where: { korisnikId },
        data: {
          razina: novaRazina,
          xpBodovi: noviXpBodovi,
        },
      });
    }
  }

  async provjeriINapraviPostignuce(korisnikId: number, kategorijaId: number) {
    const brojRijesenih = await this.prebrojuRijeseneLokacijeZaKategoriju(
      korisnikId,
      kategorijaId,
    );

    const postignuca = await this.dohvatiPostignucaZaOtkljucati(
      kategorijaId,
      brojRijesenih,
    );

    for (const postignuce of postignuca) {
      await this.obradiOtkljucavanjePostignuca(korisnikId, postignuce);
    }
  }

  async obradiOtkljucavanjePostignuca(korisnikId: number, postignuce: any) {
    const vecOtkljucano = await this.jeLiPostignuceVecOtkljucano(
      korisnikId,
      postignuce.postignuceId,
    );

    if (vecOtkljucano) {
      return;
    }

    await this.otkljucajPostignuce(korisnikId, postignuce.postignuceId);

    await this.dodijeliNagradeZaPostignuce(
      korisnikId,
      postignuce.nagradaXp,
      postignuce.nagradaValuta,
    );

    await this.dodijeliDostignuceZaPostignuce(
      korisnikId,
      postignuce.dekoracijaId,
    );
  }

  async prebrojuRijeseneLokacijeZaKategoriju(
    korisnikId: number,
    kategorijaId: number,
  ) {
    return this.prisma.rijesenaLokacija.count({
      where: {
        korisnikId,
        lokacija: {
          kategorijaId,
        },
      },
    });
  }

  async dohvatiPostignucaZaOtkljucati(
    kategorijaId: number,
    brojRijesenih: number,
  ) {
    return this.prisma.postignuce.findMany({
      where: {
        kategorijaId,
        brojPotrebnihLokacija: {
          lte: brojRijesenih,
        },
      },
      orderBy: {
        brojPotrebnihLokacija: 'asc',
      },
    });
  }

  async jeLiPostignuceVecOtkljucano(korisnikId: number, postignuceId: number) {
    const zapis = await this.prisma.korisnikPostignuce.findUnique({
      where: {
        korisnikId_postignuceId: {
          korisnikId,
          postignuceId: postignuceId,
        },
      },
    });

    return !!zapis;
  }

  async otkljucajPostignuce(korisnikId: number, postignuceId: number) {
    await this.prisma.korisnikPostignuce.create({
      data: {
        korisnikId,
        postignuceId: postignuceId,
      },
    });
  }

  async dodijeliNagradeZaPostignuce(
    korisnikId: number,
    nagradaXp: number,
    nagradaValuta: number,
  ) {
    if (nagradaXp <= 0 && nagradaValuta <= 0) {
      return;
    }
    await this.dodijeliNagradu(korisnikId, nagradaXp, nagradaValuta);
  }

  async dodijeliDostignuceZaPostignuce(
    korisnikId: number,
    dekoracijaId: number | null,
  ) {
    if (!dekoracijaId) {
      return;
    }
    await this.dekoracijeServis.dodijeliDekoracijuKorisniku(
      korisnikId,
      dekoracijaId,
    );
  }
}
