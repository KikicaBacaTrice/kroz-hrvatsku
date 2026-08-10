import { inject, Injectable, signal } from '@angular/core';
import { DolasciLokacijeHttpService } from '../podaci/dolasci-lokacije-http.service';
import { ProfilStanjeService } from '../../profil/stanje/profil-stanje.service';
import { RijesenaLokacija } from '../modeli/posjet-lokacija.model';
import { LokacijaStanjeService } from './lokacija-stanje.service';

@Injectable({
  providedIn: 'root',
})
export class DolasciLokacijeStanjeService {
  private readonly dolasciHttp = inject(DolasciLokacijeHttpService);
  private readonly profilStanje = inject(ProfilStanjeService);
  private readonly lokacijaStanje = inject(LokacijaStanjeService);

  readonly mojDolazak = signal<RijesenaLokacija | null>(null);
  readonly modalDolaskaOtvoren = signal(false);
  readonly modalUspomenaOtvoren = signal(false);
  readonly spremanjeDolaska = signal(false);

  ucitajMojDolazak(lokacijaId: number): void {
    this.mojDolazak.set(null);

    this.dolasciHttp.dohvatiMojDolazak(lokacijaId).subscribe({
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

    this.dolasciHttp.zabiljeziDolazak(lokacijaId, biljeska, slike).subscribe({
      next: (dolazak) => {
        this.mojDolazak.set(dolazak);
        this.modalDolaskaOtvoren.set(false);
        this.spremanjeDolaska.set(false);

        this.lokacijaStanje.osvjeziLokaciju(lokacijaId);
        this.profilStanje.ucitajMojProfil();

        document.body.classList.remove('body--bez-scrolla');
      },
      error: () => {
        this.spremanjeDolaska.set(false);
      },
    });
  }
}
