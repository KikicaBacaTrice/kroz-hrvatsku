import { inject, Injectable, signal } from '@angular/core';
import {
  MojProfil,
  ProfilBedz,
  ProfilSlikaPosjeta,
  UrediProfilaZahtjev,
} from '../modeli/profil.model';
import { ProfilStatistika } from '../modeli/profil-statistika.model';
import { ProfilIServis } from '../podaci/profil-iservis';

const TIP_DEKORACIJE_AVATAR = 1;
const TIP_DEKORACIJE_BEDZ = 2;
const TIP_DEKORACIJE_POZADINA = 3;

@Injectable({
  providedIn: 'root',
})
export class ProfilStanjeService {
  private readonly profilIServis = inject(ProfilIServis);

  readonly profil = signal<MojProfil | null>(null);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  readonly statistika = signal<ProfilStatistika | null>(null);
  readonly statistikaUcitavanje = signal(false);
  readonly statistikaGreska = signal<string | null>(null);

  readonly slikePosjeta = signal<ProfilSlikaPosjeta[]>([]);
  readonly slikePosjetaUcitavanje = signal(false);
  readonly slikePosjetaGreska = signal<string | null>(null);

  readonly mojiBedzevi = signal<ProfilBedz[]>([]);
  readonly bedzeviUcitavanje = signal(false);
  readonly bedzeviGreska = signal<string | null>(null);
  readonly spremanjeBedza = signal(false);

  readonly mojePozadineProfila = signal<ProfilBedz[]>([]);
  readonly mojeDekoracijeAvatara = signal<ProfilBedz[]>([]);

  ucitajMojProfil(): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.profilIServis.dohvatiMojProfil().subscribe({
      next: (profil) => {
        this.profil.set(profil);
        this.ucitavanje.set(false);
      },
      error: () => {
        this.profil.set(null);
        this.ucitavanje.set(false);
        this.greska.set('Učitavanje profila nije uspjelo');
      },
    });
  }

  ucitajMojuStatistiku(): void {
    this.statistikaUcitavanje.set(true);
    this.statistikaGreska.set(null);

    this.profilIServis.dohvatiMojuStatistiku().subscribe({
      next: (profil) => {
        this.statistika.set(profil);
        this.statistikaUcitavanje.set(false);
      },
      error: () => {
        this.statistika.set(null);
        this.statistikaUcitavanje.set(false);
        this.statistikaGreska.set('Učitavanje profila nije uspjelo');
      },
    });
  }

  urediProfil(zahtjev: UrediProfilaZahtjev): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.profilIServis.urediMojProfil(zahtjev).subscribe({
      next: () => {
        this.ucitajMojProfil();
        this.ucitavanje.set(false);
      },
      error: (greska) => {
        console.log(greska.message);
        this.greska.set('Došlo je do pogreški pri ažuriranju profila');
        this.ucitavanje.set(false);
      },
    });
  }

  promijeniProfilnuSliku(slika: File): void {
    this.profilIServis.promijeniProfilnuSliku(slika).subscribe({
      next: (profil) => {
        this.profil.set(profil);
      },
      error: () => {
        this.greska.set('Profilnu sliku nije moguće promijeniti');
      },
    });
  }

  obrisiProfilnuSliku(): void {
    this.profilIServis.obrisiProfilnuSliku().subscribe({
      next: (profil) => {
        this.profil.set(profil);
      },
      error: () => {
        this.greska.set('Profilnu sliku nije moguće obrisati');
      },
    });
  }

  ucitajMojeSlikePosjeta(): void {
    this.slikePosjetaUcitavanje.set(true);
    this.slikePosjetaGreska.set(null);

    this.profilIServis.dohvatiMojeSlikePosjeta().subscribe({
      next: (slike) => {
        this.slikePosjeta.set(slike);
        this.slikePosjetaUcitavanje.set(false);
      },
      error: () => {
        this.slikePosjeta.set([]);
        this.slikePosjetaGreska.set(
          'Slike posjeta se trenutno ne mogu učitati',
        );
        this.slikePosjetaUcitavanje.set(false);
      },
    });
  }

  ucitajMojeDekoracijeProfila(): void {
    this.profilIServis.dohvatiMojeBedzeve().subscribe({
      next: (korisnikDekoracije) => {
        const mapiraj = (zapis: any) => ({
          bedzId: zapis.dekoracija.dekoracijaId,
          naziv: zapis.dekoracija.naziv,
          opis: zapis.dekoracija.opis,
          putanjaIkone: zapis.dekoracija.slikaDekoracija,
        });

        this.mojiBedzevi.set(
          korisnikDekoracije
            .filter(
              (zapis) => zapis.dekoracija?.tipDekoracije?.tipDekoracijeId === 2,
            )
            .map(mapiraj),
        );

        this.mojePozadineProfila.set(
          korisnikDekoracije
            .filter(
              (zapis) => zapis.dekoracija?.tipDekoracije?.tipDekoracijeId === 3,
            )
            .map(mapiraj),
        );

        this.mojeDekoracijeAvatara.set(
          korisnikDekoracije
            .filter(
              (zapis) => zapis.dekoracija?.tipDekoracije?.tipDekoracijeId === 1,
            )
            .map(mapiraj),
        );
      },
    });
  }

  postaviBedzNaProfil(pozicijaBedz: number, bedzId: number) {
    this.spremanjeBedza.set(true);
    this.bedzeviGreska.set(null);

    this.profilIServis.postaviBedzNaProfil(pozicijaBedz, bedzId).subscribe({
      next: () => {
        this.ucitajMojProfil();
        this.ucitajMojeDekoracijeProfila();
        this.spremanjeBedza.set(false);
      },
      error: () => {
        this.bedzeviGreska.set('Došlo je do pogreške pri spremanju bedža');
        this.spremanjeBedza.set(false);
      },
    });
  }

  aktivirajDekoraciju(dekoracijaId: number, pozicijaPrikaza = 1): void {
    this.profilIServis
      .aktivirajDekoraciju(dekoracijaId, pozicijaPrikaza)
      .subscribe({
        next: () => {
          this.ucitajMojProfil();
          this.ucitajMojeDekoracijeProfila();
        },
        error: () => {
          this.greska.set('Dekoraciju nije moguće postaviti');
        },
      });
  }

  postaviDefaultPozadinu(): void {
    this.postaviDefaultDekoraciju(TIP_DEKORACIJE_POZADINA);
  }

  postaviDefaultDekoracijuAvatara(): void {
    this.postaviDefaultDekoraciju(TIP_DEKORACIJE_AVATAR);
  }

  postaviDefaultDekoraciju(tipDekoracijeId: number): void {
    this.profilIServis.deaktivirajTipDekoracije(tipDekoracijeId).subscribe({
      next: () => {
        this.ucitajMojProfil();
        this.ucitajMojeDekoracijeProfila();
      },
      error: () => {
        this.greska.set('Dekoraciju nije moguće vratiti na zadanu vrijednost');
      },
    });
  }

  ocistiProfil(): void {
    this.profil.set(null);
  }
}
