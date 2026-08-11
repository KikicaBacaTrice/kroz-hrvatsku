import { inject, Injectable, signal } from '@angular/core';
import { ProfilHttpService } from '../podaci/profil-http.service';
import { MojProfil } from '../modeli/profil.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilStanjeService {
  private readonly profilHttp = inject(ProfilHttpService);
  readonly profil = signal<MojProfil | null>(null);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  ucitajMojProfil(): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.profilHttp.dohvatiMojProfil().subscribe({
      next: (profil) => {
        this.profil.set(profil);
        this.ucitavanje.set(false);
      },
      error: () => {
        this.profil.set(null);
        this.ucitavanje.set(false);
        this.greska.set('Učitavanje profila nije uspjelo');
      },
    });
  }

  ocistiProfil(): void {
    this.profil.set(null);
  }
}
