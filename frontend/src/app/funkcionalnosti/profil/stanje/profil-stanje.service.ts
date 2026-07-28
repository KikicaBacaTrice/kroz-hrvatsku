import { inject, Injectable, signal } from '@angular/core';
import { ProfilHttpService } from '../podaci/profil-http.service';
import { MojProfil } from '../modeli/profil.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilStanjeService {
  private readonly profilHttp = inject(ProfilHttpService);
  readonly profil = signal<MojProfil | null>(null);

  ucitajMojProfil(): void {
    this.profilHttp.dohvatiMojProfil().subscribe({
      next: (profil) => this.profil.set(profil),
      error: () => this.profil.set(null),
    });
  }

  ocistiProfil(): void {
    this.profil.set(null);
  }
}
