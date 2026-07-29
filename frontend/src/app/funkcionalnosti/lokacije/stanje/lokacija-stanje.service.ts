import { inject, Injectable, signal } from '@angular/core';
import { LokacijeHttpService } from '../podaci/lokacije-http.service';
import { Lokacija } from '../modeli/lokacija.model';

@Injectable({
  providedIn: 'root',
})
export class LokacijaStanjeService {
  private readonly lokacijaHttp = inject(LokacijeHttpService);
  readonly lokacija = signal<Lokacija | null>(null);

  dohvatiPodatkeLokacije(lokacijaId: number): void {
    this.lokacijaHttp.dohvatiTrazenuLokaciju(lokacijaId).subscribe({
      next: (lokacija) => this.lokacija.set(lokacija),
      error: () => this.lokacija.set(null),
    });
  }
}
