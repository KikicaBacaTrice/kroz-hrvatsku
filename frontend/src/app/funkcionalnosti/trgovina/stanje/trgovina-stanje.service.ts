import { computed, inject, Injectable, signal } from '@angular/core';
import { TrgovinaHttpService } from '../podaci/trgovina-http.service';
import { Dekoracija, KorisnikDekoracija } from '../modeli/dekoracija.model';
import { ProfilStanjeService } from '../../profil/stanje/profil-stanje.service';

@Injectable({
  providedIn: 'root',
})
export class TrgovinaStanjeService {
  private readonly trgovinaHttp = inject(TrgovinaHttpService);
  private readonly profilStanje = inject(ProfilStanjeService);

  readonly dekoracije = signal<Dekoracija[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  readonly mojeDekoracije = signal<KorisnikDekoracija[]>([]);
  readonly kupnjaUcitavanje = signal<number | null>(null);
  readonly kupnjaGreska = signal<string | null>(null);

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

  imaDekoraciju(dekoracijaId: number): boolean {
    return this.mojeDekoracije().some(
      (zapis) => zapis.dekoracijaId === dekoracijaId,
    );
  }

  ucitajMojeDekoracije(): void {
    this.trgovinaHttp.dohvatiMojeDekoracije().subscribe({
      next: (dekoracije) => {
        this.mojeDekoracije.set(dekoracije);
      },
      error: () => {
        this.mojeDekoracije.set([]);
      },
    });
  }

  kupiDekoraciju(dekoracijaId: number): void {
    this.kupnjaUcitavanje.set(dekoracijaId);
    this.kupnjaGreska.set(null);

    this.trgovinaHttp.kupiDekoraciju(dekoracijaId).subscribe({
      next: (kupljenaDekoracija) => {
        this.mojeDekoracije.update((trenutne) => [
          kupljenaDekoracija,
          ...trenutne,
        ]);

        this.profilStanje.ucitajMojProfil();
        this.kupnjaUcitavanje.set(null);
      },
      error: () => {
        this.kupnjaGreska.set('Došlo je do pogreški pri kupnji dekoracije');
        this.kupnjaUcitavanje.set(null);
      },
    });
  }
}
