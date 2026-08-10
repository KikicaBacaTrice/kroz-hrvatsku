import { inject, Injectable, signal } from '@angular/core';
import { LokacijeHttpService } from '../podaci/lokacije-http.service';
import { Lokacija } from '../modeli/lokacija.model';
import { FilterLokacija } from '../modeli/filter-lokacija.model';
import { ProfilStanjeService } from '../../profil/stanje/profil-stanje.service';
import { RijesenaLokacija } from '../modeli/posjet-lokacija.model';

@Injectable({
  providedIn: 'root',
})
export class LokacijaStanjeService {
  private readonly lokacijeHttp = inject(LokacijeHttpService);
  private readonly profilStanje = inject(ProfilStanjeService);

  readonly lokacija = signal<Lokacija | null>(null);
  readonly lokacije = signal<Lokacija[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  readonly mojDolazak = signal<RijesenaLokacija | null>(null);
  readonly modalDolaskaOtvoren = signal(false);
  readonly modalUspomenaOtvoren = signal(false);
  readonly spremanjeDolaska = signal(false);

  readonly filter = signal<FilterLokacija>({});

  ucitajLokaciju(lokacijaId: number): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeHttp.dohvatiTrazenuLokaciju(lokacijaId).subscribe({
      next: (lokacija) => {
        this.lokacija.set(lokacija);
        this.ucitavanje.set(false);
      },
      error: () => {
        this.lokacija.set(null);
        this.greska.set('Lokacija se trenutno ne može učitati.');
        this.ucitavanje.set(false);
      },
    });
  }

  ucitajLokacije(filter: FilterLokacija = this.filter()): void {
    this.ucitavanje.set(true);
    this.greska.set(null);
    this.filter.set(filter);

    this.lokacijeHttp.dohvatiSveLokacije(filter).subscribe({
      next: (lokacije) => {
        this.lokacije.set(lokacije);
        this.ucitavanje.set(false);
      },
      error: () => {
        this.greska.set('Došlo je do pogreške pri učitavanju lokacija');
        this.ucitavanje.set(false);
      },
    });
  }

  ucitajMojDolazak(lokacijaId: number): void {
    this.lokacijeHttp.dohvatiMojDolazak(lokacijaId).subscribe({
      next: (dolazak) => this.mojDolazak.set(dolazak),
      error: () => this.mojDolazak.set(null),
    });
  }

  otvoriModelDolaska(): void {
    this.modalDolaskaOtvoren.set(true);
    document.body.classList.add('body--bez-scrolla');
  }

  zatvoriModalDolaska(): void {
    this.modalDolaskaOtvoren.set(false);
    document.body.classList.remove('body--bez-scrolla');
  }

  otvoriModelUspomena(): void {
    this.modalUspomenaOtvoren.set(true);
    document.body.classList.add('body--bez-scrolla');
  }

  zatvoriModalUspomena(): void {
    this.modalUspomenaOtvoren.set(false);
    document.body.classList.remove('body--bez-scrolla');
  }

  zabiljeziDolazak(lokacijaId: number, biljeska: string, slike: File[]): void {
    this.spremanjeDolaska.set(true);

    this.lokacijeHttp.zabiljeziDolazak(lokacijaId, biljeska, slike).subscribe({
      next: (dolazak) => {
        this.mojDolazak.set(dolazak as RijesenaLokacija);
        this.modalDolaskaOtvoren.set(false);
        this.spremanjeDolaska.set(false);

        this.osvjeziLokaciju(lokacijaId);
        this.profilStanje.ucitajMojProfil();

        document.body.classList.remove('body--bez-scrolla');
      },
      error: () => {
        this.spremanjeDolaska.set(false);
      },
    });
  }

  osvjeziLokaciju(lokacijaId: number): void {
    this.lokacijeHttp.dohvatiTrazenuLokaciju(lokacijaId).subscribe({
      next: (lokacija) => this.lokacija.set(lokacija),
    });
  }

  resetirajFilter(): void {
    this.filter.set({});
    this.ucitajLokacije({});
  }
}
