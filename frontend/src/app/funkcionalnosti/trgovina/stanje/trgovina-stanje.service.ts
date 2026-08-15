import { computed, inject, Injectable, signal } from '@angular/core';
import { TrgovinaHttpService } from '../podaci/trgovina-http.service';
import { Dekoracija } from '../modeli/dekoracija.model';

@Injectable({
  providedIn: 'root',
})
export class TrgovinaStanjeService {
  private readonly trgovinaHttp = inject(TrgovinaHttpService);

  readonly dekoracije = signal<Dekoracija[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  readonly dekoracijePoTipu = computed(() => {
    const grupe = new Map<string, Dekoracija[]>();

    for (const dekoracija of this.dekoracije()) {
      const tip = dekoracija.tipDekoracije.naziv;

      if (!grupe.has(tip)) {
        grupe.set(tip, []);
      }

      grupe.get(tip)!.push(dekoracija);
    }

    return Array.from(grupe.entries()).map(([tip, dekoracije]) => ({
      tip,
      dekoracije,
    }));
  });

  ucitajDekoracije(): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.trgovinaHttp.dohvatiDekoracije().subscribe({
      next: (dekoracije) => {
        this.dekoracije.set(dekoracije);
        this.ucitavanje.set(false);
      },
      error: () => {
        this.dekoracije.set([]);
        this.greska.set('Došlo je pogreške pri učitavanju dekoracija');
        this.ucitavanje.set(false);
      },
    });
  }
}
