import { inject, Injectable, signal } from '@angular/core';
import { LokacijeHttpService } from '../podaci/lokacije-http.service';
import {
  AzurirajKomentarLokacijeZahtjev,
  DodajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../modeli/komentarLokacije.model';
import { LokacijaStanjeService } from './lokacija-stanje.service';

@Injectable({
  providedIn: 'root',
})
export class KomentariLokacijeStanjeService {
  private readonly lokacijeHttp = inject(LokacijeHttpService);
  private readonly lokacijaStanje = inject(LokacijaStanjeService);

  readonly komentari = signal<KomentarLokacije[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  ucitajKomentare(lokacijaId: number): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeHttp.dohvatiKomentareLokacije(lokacijaId).subscribe({
      next: (komentari) => {
        this.komentari.set(komentari);
        this.ucitavanje.set(false);
      },
      error: () => {
        this.komentari.set([]);
        this.greska.set('Neuspješno učitavanje komentara');
        this.ucitavanje.set(false);
      },
    });
  }

  dodajKomentar(
    lokacijaId: number,
    zahtjev: DodajKomentarLokacijeZahtjev,
  ): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeHttp.dodajKomentarLokacije(lokacijaId, zahtjev).subscribe({
      next: () => {
        this.ucitavanje.set(false);
        this.ucitajKomentare(lokacijaId);
        this.lokacijaStanje.osvjeziLokaciju(lokacijaId);
      },
      error: (greska) => {
        this.ucitavanje.set(false);

        if (greska.status === 403) {
          this.greska.set(
            'Komentar može ostaviti jedino ako se zabilježili dolazak ',
          );
          return;
        }

        this.greska.set('Dogodila se pogreška pri dodavanju komentara');
      },
    });
  }

  obrisiKomentar(lokacijaId: number, povratnaInformacijaId: number): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeHttp
      .obrisiKomentarLokacije(lokacijaId, povratnaInformacijaId)
      .subscribe({
        next: () => {
          this.komentari.update((komentari) =>
            komentari.filter(
              (komentar) =>
                komentar.povratnaInformacijaId !== povratnaInformacijaId,
            ),
          );
          this.ucitavanje.set(false);
          this.lokacijaStanje.osvjeziLokaciju(lokacijaId);
        },
        error: (greska) => {
          this.ucitavanje.set(false);

          if (greska.status === 404) {
            this.greska.set(
              'Komentar nije pronađen ili ga ne možete obrisati.',
            );
            return;
          }

          if (greska.status === 401) {
            this.greska.set('Morate biti prijavljeni za brisanje komentara.');
            return;
          }

          this.greska.set('Dogodila se pogreška pri brisanju komentara.');
        },
      });
  }

  urediKomentar(
    lokacijaId: number,
    povratnaInformacijaId: number,
    zahtjev: AzurirajKomentarLokacijeZahtjev,
  ) {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeHttp
      .urediKomentarLokacije(lokacijaId, povratnaInformacijaId, zahtjev)
      .subscribe({
        next: () => {
          this.ucitavanje.set(false);
          this.ucitajKomentare(lokacijaId);
          this.lokacijaStanje.osvjeziLokaciju(lokacijaId);
        },
        error: () => {
          this.ucitavanje.set(false);
          this.greska.set('Komentar nije moguće urediti');
        },
      });
  }
}
