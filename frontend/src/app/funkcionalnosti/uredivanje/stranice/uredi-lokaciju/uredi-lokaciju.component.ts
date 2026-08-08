import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import {
  KategorijaLokacije,
  Lokacija,
} from '../../../lokacije/modeli/lokacija.model';
import { LokacijaFormaModel } from '../../modeli/lokacija-forma.mode';
import { LokacijaFormaComponent } from '../../ui/lokacija-forma/lokacija-forma.component';
import { FormsModule } from '@angular/forms';
import { UrediSlikeLokacijeComponent } from '../../ui/uredi-slike-lokacije/uredi-slike-lokacije.component';
import { KategorijeStanjeService } from '../../../lokacije/stanje/kategorije-stanje.service';

@Component({
  selector: 'app-uredi-lokaciju',
  imports: [LokacijaFormaComponent, FormsModule, UrediSlikeLokacijeComponent],
  templateUrl: './uredi-lokaciju.component.html',
  styleUrl: './uredi-lokaciju.component.scss',
})
export class UrediLokacijuComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly lokacijeHttp = inject(LokacijeHttpService);
  private readonly kateogrijeStanje = inject(KategorijeStanjeService);

  readonly lokacija = signal<Lokacija | null>(null);
  readonly kategorije = this.kateogrijeStanje.kategorije;
  readonly pocetnaVrijednostForme = signal<Partial<LokacijaFormaModel> | null>(
    null,
  );
  private lokacijaId = 0;

  ngOnInit(): void {
    this.lokacijaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isNaN(this.lokacijaId)) {
      this.ucitajLokaciju();
    }

    this.kateogrijeStanje.ucitajKategorije();
  }

  mapirajLokacijuUFormu(lokacija: Lokacija): Partial<LokacijaFormaModel> {
    return {
      naziv: lokacija.naziv,
      opis: lokacija.opis ?? '',
      adresa: lokacija.adresa,
      grad: lokacija.grad,
      zupanija: lokacija.zupanija,
      ulaznicaCijena: lokacija.ulaznicaCijena,
      geoSirina: lokacija.geoSirina,
      geoDuzina: lokacija.geoDuzina,
      nagradaXp: lokacija.nagradaXp,
      nagradaValuta: lokacija.nagradaValuta,
      kategorijaId: lokacija.kategorija.kategorijaId,
    };
  }

  azurirajLokaciju(zahtjev: LokacijaFormaModel): void {
    console.log('PATCH lokacijaId:', this.lokacijaId);
    console.log('PATCH zahtjev:', zahtjev);
    this.lokacijeHttp.azurirajLokaciju(this.lokacijaId, zahtjev).subscribe({
      next: () => {
        console.log('azurirana lokacija', this.lokacija);
        this.router.navigate(['/uredivanje/lokacije']);
      },
      error: (greska) => {
        console.log('Greska: ', greska);
      },
    });
  }

  odustani(): void {
    this.router.navigate(['/uredivanje/lokacije']);
  }

  ucitajLokaciju(): void {
    this.lokacijeHttp.dohvatiTrazenuLokaciju(this.lokacijaId).subscribe({
      next: (lokacija) => {
        this.lokacija.set(lokacija);
        this.pocetnaVrijednostForme.set(this.mapirajLokacijuUFormu(lokacija));
      },
    });
  }
}
