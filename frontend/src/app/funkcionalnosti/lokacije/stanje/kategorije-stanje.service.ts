import { inject, Injectable, signal } from '@angular/core';
import { KategorijeHttpService } from '../podaci/kategorije-http.service';
import { KategorijaLokacije } from '../modeli/lokacija.model';

@Injectable({
  providedIn: 'root',
})
export class KategorijeStanjeService {
  private readonly kategorijeHttp = inject(KategorijeHttpService);

  readonly kategorije = signal<KategorijaLokacije[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  ucitajKategorije(): void {
    if (this.kategorije().length > 0) {
      return;
    }

    this.ucitavanje.set(true);
    this.greska.set(null);

    this.kategorijeHttp.dohvatiSveKategorije().subscribe({
      next: (kategorije) => {
        this.kategorije.set(kategorije);
        this.ucitavanje.set(false);
      },
      error: () => {
        this.greska.set('Kategorije se trenutno ne mogu učitati');
        this.ucitavanje.set(false);
      },
    });
  }

  osvjeziKategorije(): void {
    this.kategorije.set([]);
    this.ucitajKategorije();
  }
}
