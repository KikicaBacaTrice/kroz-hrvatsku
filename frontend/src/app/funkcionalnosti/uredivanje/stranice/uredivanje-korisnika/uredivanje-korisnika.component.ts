import { Component, inject, OnInit } from '@angular/core';
import { KorisniciAdminStanjeService } from '../../stanje/korisnici-admin-stanje.service';
import { AdminKorisnik } from '../../../profil/modeli/profil.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uredivanje-korisnika',
  imports: [FormsModule],
  templateUrl: './uredivanje-korisnika.component.html',
  styleUrl: './uredivanje-korisnika.component.scss',
})
export class UredivanjeKorisnikaComponent implements OnInit {
  readonly korisniciStanje = inject(KorisniciAdminStanjeService);

  ngOnInit(): void {
    this.korisniciStanje.ucitajKorisnike();
  }

  azurirajNovac(korisnikId: number, vrijednost: string): void {
    this.korisniciStanje.azurirajNovac(korisnikId, Number(vrijednost));
  }

  obrisiKorisnika(korisnik: AdminKorisnik): void {
    if (korisnik.ulogaId === 2) {
      return;
    }

    const potvrdeno = confirm(
      `Jeste li sigurni da želite obrisati korisnika ${korisnik.korisnickoIme}`,
    );

    if (!potvrdeno) {
      return;
    }

    this.korisniciStanje.obrisiKorisnika(korisnik.korisnikId);
  }
}
