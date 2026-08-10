import { inject, Injectable, signal } from '@angular/core';
import { LokacijeHttpService } from '../podaci/lokacije-http.service';
import { Lokacija } from '../modeli/lokacija.model';
import { FilterLokacija } from '../modeli/filter-lokacija.model';

@Injectable({
  providedIn: 'root',
})
export class LokacijaStanjeService {
  private readonly lokacijeHttp = inject(LokacijeHttpService);

  readonly lokacija = signal<Lokacija | null>(null);
  readonly lokacije = signal<Lokacija[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

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
