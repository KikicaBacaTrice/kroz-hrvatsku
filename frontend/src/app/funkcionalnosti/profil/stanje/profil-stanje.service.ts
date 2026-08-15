import { inject, Injectable, signal } from '@angular/core';
import { ProfilHttpService } from '../podaci/profil-http.service';
import {
  MojProfil,
  ProfilBedz,
  ProfilSlikaPosjeta,
} from '../modeli/profil.model';
import { single } from 'rxjs';
import { ProfilStatistika } from '../modeli/profil-statistika.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilStanjeService {
  private readonly profilHttp = inject(ProfilHttpService);

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

  ucitajMojProfil(): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.profilHttp.dohvatiMojProfil().subscribe({
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

    this.profilHttp.dohvatiMojuStatistiku().subscribe({
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

  ucitajMojeSlikePosjeta(): void {
    this.slikePosjetaUcitavanje.set(true);
    this.slikePosjetaGreska.set(null);

    this.profilHttp.dohvatiMojeSlikePosjeta().subscribe({
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

  ucitajMojeBedzeve(): void {
    this.bedzeviUcitavanje.set(true);
    this.bedzeviGreska.set(null);

    this.profilHttp.dohvatiMojeBedzeve().subscribe({
      next: (korisnikDekoracije) => {
        const bedzevi = korisnikDekoracije
          .filter((zapis) => zapis.dekoracija?.tipDekoracije?.naziv === 'Bedž')
          .map((zapis) => ({
            bedzId: zapis.dekoracija.dekoracijaId,
            naziv: zapis.dekoracija.naziv,
            opis: zapis.dekoracija.opis,
            putanjaIkone: zapis.dekoraicja.slikaDekoracije,
          }));

        this.mojiBedzevi.set(bedzevi);
        this.bedzeviUcitavanje.set(false);
      },
      error: () => {
        this.mojiBedzevi.set([]);
        this.bedzeviGreska.set('Bedževi se trenutno ne mogu učitati');
        this.bedzeviUcitavanje.set(false);
      },
    });
  }

  postaviBedzNaProfil(pozicijaBedz: number, bedzId: number) {
    this.spremanjeBedza.set(true);

    this.profilHttp.postaviBedzNaProfil(pozicijaBedz, bedzId).subscribe({
      next: () => {
        this.ucitajMojProfil();
        this.ucitajMojeBedzeve();
        this.spremanjeBedza.set(false);
      },
      error: () => {
        this.bedzeviGreska.set('Došlo je do pogreške pri spremanju bedža');
        this.spremanjeBedza.set(false);
      },
    });
  }

  ocistiProfil(): void {
    this.profil.set(null);
  }
}
