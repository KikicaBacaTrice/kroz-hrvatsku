import { inject, Injectable, signal } from '@angular/core';
import { LokacijeHttpService } from '../podaci/lokacije-http.service';
import { KomentarLokacije } from '../modeli/komentarLokacije.model';

@Injectable({
  providedIn: 'root',
})
export class KomentariLokacijeStanjeService {
  private readonly lokacijeHttp = inject(LokacijeHttpService);

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
}
