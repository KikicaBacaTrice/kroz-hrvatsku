import { Component, effect, inject } from '@angular/core';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { ZvijezdaIkonaComponent } from '../../../../dijeljeno/ui/ikone/zvijezda-ikona/zvijezda-ikona.component';
import { KarticaInformacijeDetaljaLokacijeComponent } from '../../ui/kartica-informacije-detalja-lokacije/kartica-informacije-detalja-lokacije.component';
import { KartaLokacijeComponent } from '../../ui/karta-lokacije/karta-lokacije.component';
import { KarticaIzazovaLokacijeComponent } from '../../ui/kartica-izazova-lokacije/kartica-izazova-lokacije.component';
import { LokacijaHeroComponent } from '../../ui/lokacija-hero/lokacija-hero.component';
import { LokacijaOpisComponent } from '../../ui/lokacija-opis/lokacija-opis.component';
import { Lokacija } from '../../modeli/lokacija.model';
import { LokacijaGalerijaComponent } from '../../ui/lokacija-galerija/lokacija-galerija.component';
import { LokacijaInformacijeComponent } from '../../ui/lokacija-informacije/lokacija-informacije.component';

@Component({
  selector: 'app-detalji-lokacije',
  imports: [
    KarticaInformacijeDetaljaLokacijeComponent,
    KartaLokacijeComponent,
    KarticaIzazovaLokacijeComponent,
    LokacijaHeroComponent,
    LokacijaOpisComponent,
    LokacijaGalerijaComponent,
    LokacijaInformacijeComponent,
  ],
  templateUrl: './detalji-lokacije.component.html',
  styleUrl: './detalji-lokacije.component.scss',
})
export class DetaljiLokacijeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly lokacijaStanje = inject(LokacijaStanjeService);

  readonly apiUrl = API_URL;
  readonly lokacija = this.lokacijaStanje.lokacija;

  constructor() {
    effect(() => {
      console.log(this.lokacija());
    });
  }

  ngOnInit(): void {
    const lokacijaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isNaN(lokacijaId)) {
      this.lokacijaStanje.dohvatiPodatkeLokacije(lokacijaId);
    }
  }

  naZabiljeziDolazak() {}
}
