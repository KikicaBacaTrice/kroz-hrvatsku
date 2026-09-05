import { inject, Injectable, signal } from '@angular/core';
import { AdminKorisnik } from '../../profil/modeli/profil.model';
import { KorisniciAdminIServis } from '../podaci/korisnici-admin-iservis';
import { ProfilStanjeService } from '../../profil/stanje/profil-stanje.service';

@Injectable({
  providedIn: 'root',
})
export class KorisniciAdminStanjeService {
  private readonly korisniciServis = inject(KorisniciAdminIServis);
  private readonly profilStanje = inject(ProfilStanjeService);

  readonly korisnici = signal<AdminKorisnik[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  ucitajKorisnike(): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.korisniciServis.dohvatiSveKorisnike().subscribe({
      next: (korisnici) => {
        this.korisnici.set(korisnici);
        this.ucitavanje.set(false);
      },
      error: (greska) => {
        this.greska.set(`Korisnici se trenutno ne mogu učitati. ${greska}`);
        this.ucitavanje.set(false);
      },
    });
  }

  azurirajNovac(korisnikId: number, virtualniNovac: number): void {
    this.korisniciServis
      .azurirajNovacKorisnika(korisnikId, { virtualniNovac })
      .subscribe({
        next: () => {
          this.korisnici.update((korisnici) =>
            korisnici.map((korisnik) =>
              korisnik.korisnikId === korisnikId
                ? {
                    ...korisnik,
                    profil: {
                      ...korisnik.profil!,
                      virtualniNovac,
                    },
                  }
                : korisnik,
            ),
          );
          if (this.profilStanje.profil()?.korisnikId === korisnikId) {
            this.profilStanje.ucitajMojProfil();
          }
        },
        error: () => {
          this.greska.set('Virtualni novac nije moguće ažurirati.');
        },
      });
  }

  obrisiKorisnika(korisnikId: number): void {
    this.korisniciServis.obrisiKorisnika(korisnikId).subscribe({
      next: () => {
        this.korisnici.update((korisnici) =>
          korisnici.filter((korisnik) => korisnik.korisnikId !== korisnikId),
        );
      },
      error: () => {
        this.greska.set('Korisnika nije moguće obrisati.');
      },
    });
  }
}
