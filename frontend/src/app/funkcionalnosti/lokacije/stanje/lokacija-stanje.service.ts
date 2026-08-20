import { inject, Injectable, signal } from '@angular/core';
import { Lokacija } from '../modeli/lokacija.model';
import { FilterLokacija } from '../modeli/filter-lokacija.model';
import { LokacijeIServis } from '../podaci/lokacije-iservis';
import { LokacijaFormaModel } from '../../uredivanje/modeli/lokacija-forma.mode';

@Injectable({
  providedIn: 'root',
})
export class LokacijaStanjeService {
  private readonly lokacijeIServis = inject(LokacijeIServis);

  readonly lokacija = signal<Lokacija | null>(null);
  readonly lokacije = signal<Lokacija[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  readonly filter = signal<FilterLokacija>({});

  readonly odabranaZupanija = signal<string | null>(null);
  readonly topLokacijeZupanije = signal<Lokacija[]>([]);
  readonly ucitavanjeTopLokacijaZupanije = signal(false);

  ucitajLokaciju(lokacijaId: number): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeIServis.dohvatiTrazenuLokaciju(lokacijaId).subscribe({
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

    this.lokacijeIServis.dohvatiSveLokacije(filter).subscribe({
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

  ucitajTopLokacijePoZupaniji(zupanija: string): void {
    this.odabranaZupanija.set(zupanija);
    this.ucitavanjeTopLokacijaZupanije.set(true);
    this.greska.set(null);

    this.lokacijeIServis.dohvatiSveLokacije({ zupanija }).subscribe({
      next: (lokacije) => {
        this.topLokacijeZupanije.set(
          lokacije
            .sort((a, b) => (b.prosjecnaOcjena ?? 0) - (a.prosjecnaOcjena ?? 0))
            .slice(0, 1),
        );

        this.ucitavanjeTopLokacijaZupanije.set(false);
      },
      error: () => {
        this.topLokacijeZupanije.set([]);
        this.greska.set('Došlo je do pogreške pri učitavanju lokacija');
        this.ucitavanjeTopLokacijaZupanije.set(false);
      },
    });
  }

  ucitajLokacijeZaUredivanje(): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeIServis.dohvatiSveLokacije().subscribe({
      next: (lokacije) => {
        this.lokacije.set(
          [...lokacije].sort((a, b) => a.lokacijaId - b.lokacijaId),
        );
        this.ucitavanje.set(false);
      },
      error: () => {
        this.greska.set('Došlo je do pogreške pri učitavanju lokacija');
        this.ucitavanje.set(false);
      },
    });
  }

  obrisiLokaciju(lokacija: Lokacija): void {
    const potvrdeno = confirm(
      `Jeste li sigurni da želite obrisati lokaciju ${lokacija.naziv}`,
    );

    if (!potvrdeno) {
      return;
    }

    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeIServis.obrisiLokaciju(lokacija.lokacijaId).subscribe({
      next: () => {
        this.lokacije.update((lokacije) =>
          lokacije.filter(
            (trenutnaLokacija) =>
              trenutnaLokacija.lokacijaId !== lokacija.lokacijaId,
          ),
        );

        this.ucitavanje.set(false);
      },
      error: () => {
        this.greska.set('Došlo je do pogreške pri brisanju lokacije');
        this.ucitavanje.set(false);
      },
    });
  }

  ucitajLokacijuZaUredivanje(lokacijaId: number): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeIServis.dohvatiTrazenuLokaciju(lokacijaId).subscribe({
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

  azurirajLokaciju(
    lokacijaId: number,
    zahtjev: Partial<LokacijaFormaModel>,
    nakonSpremanja?: () => void,
  ): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeIServis.azurirajLokaciju(lokacijaId, zahtjev).subscribe({
      next: (lokacija) => {
        this.lokacija.set(lokacija);
        this.ucitavanje.set(false);
        nakonSpremanja?.();
      },
      error: () => {
        this.greska.set('Došlo je do pogreške pri uređivanju lokacije.');
        this.ucitavanje.set(false);
      },
    });
  }

  dodajLokaciju(
    zahtjev: LokacijaFormaModel,
    nakonSpremanja?: (lokacija: Lokacija) => void,
  ): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeIServis.dodajLokaciju(zahtjev).subscribe({
      next: (lokacija) => {
        this.lokacije.update((lokacije) =>
          [...lokacije, lokacija].sort((a, b) => a.lokacijaId - b.lokacijaId),
        );

        this.ucitavanje.set(false);
        nakonSpremanja?.(lokacija);
      },
      error: () => {
        this.greska.set('Došlo je do pogreške pri dodavanju lokacije.');
        this.ucitavanje.set(false);
      },
    });
  }

  osvjeziLokaciju(lokacijaId: number): void {
    this.lokacijeIServis.dohvatiTrazenuLokaciju(lokacijaId).subscribe({
      next: (lokacija) => this.lokacija.set(lokacija),
    });
  }

  resetirajFilter(): void {
    this.filter.set({});
    this.ucitajLokacije({});
  }
}
