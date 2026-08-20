import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  KategorijaLokacije,
  Lokacija,
} from '../../../lokacije/modeli/lokacija.model';
import { LokacijaFormaModel } from '../../modeli/lokacija-forma.mode';
import { LokacijaFormaComponent } from '../../ui/lokacija-forma/lokacija-forma.component';
import { FormsModule } from '@angular/forms';
import { UrediSlikeLokacijeComponent } from '../../ui/uredi-slike-lokacije/uredi-slike-lokacije.component';
import { KategorijeStanjeService } from '../../../lokacije/stanje/kategorije-stanje.service';
import { LokacijeHttpService } from '../../../lokacije/podaci/servisi/lokacije-http.service';
import { LokacijaStanjeService } from '../../../lokacije/stanje/lokacija-stanje.service';

@Component({
  selector: 'app-uredi-lokaciju',
  imports: [LokacijaFormaComponent, FormsModule, UrediSlikeLokacijeComponent],
  templateUrl: './uredi-lokaciju.component.html',
  styleUrl: './uredi-lokaciju.component.scss',
})
export class UrediLokacijuComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly kategorijeStanje = inject(KategorijeStanjeService);
  readonly lokacijaStanje = inject(LokacijaStanjeService);

  readonly kategorije = this.kategorijeStanje.kategorije;
  private lokacijaId = 0;

  ngOnInit(): void {
    this.lokacijaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isNaN(this.lokacijaId)) {
      this.lokacijaStanje.ucitajLokacijuZaUredivanje(this.lokacijaId);
    }

    this.kategorijeStanje.ucitajKategorije();
  }

  readonly pocetnaVrijednostForme = computed(() => {
    const lokacija = this.lokacijaStanje.lokacija();

    if (!lokacija) {
      return null;
    }

    return this.mapirajLokacijuUFormu(lokacija);
  });

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
      kategorijaId: lokacija.kategorija?.kategorijaId ?? lokacija.kateogrijaId,
    };
  }

  azurirajLokaciju(zahtjev: LokacijaFormaModel): void {
    this.lokacijaStanje.azurirajLokaciju(this.lokacijaId, zahtjev, () =>
      this.router.navigate(['/uredivanje/lokacije']),
    );
  }

  odustani(): void {
    this.router.navigate(['/uredivanje/lokacije']);
  }
}
