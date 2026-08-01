import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { KartaLokacijeComponent } from '../../ui/karta-lokacije/karta-lokacije.component';
import { KarticaIzazovaLokacijeComponent } from '../../ui/kartica-izazova-lokacije/kartica-izazova-lokacije.component';
import { LokacijaHeroComponent } from '../../ui/lokacija-hero/lokacija-hero.component';
import { LokacijaOpisComponent } from '../../ui/lokacija-opis/lokacija-opis.component';
import { LokacijaGalerijaComponent } from '../../ui/lokacija-galerija/lokacija-galerija.component';
import { LokacijaInformacijeComponent } from '../../ui/lokacija-informacije/lokacija-informacije.component';
import { SlikaLokacije } from '../../modeli/lokacija.model';
import { LokacijaGalerijaModalComponent } from '../../ui/lokacija-galerija-modal/lokacija-galerija-modal.component';

@Component({
  selector: 'app-detalji-lokacije',
  imports: [
    KartaLokacijeComponent,
    KarticaIzazovaLokacijeComponent,
    LokacijaHeroComponent,
    LokacijaOpisComponent,
    LokacijaGalerijaComponent,
    LokacijaInformacijeComponent,
    LokacijaGalerijaModalComponent,
  ],
  templateUrl: './detalji-lokacije.component.html',
  styleUrl: './detalji-lokacije.component.scss',
})
export class DetaljiLokacijeComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly lokacijaStanje = inject(LokacijaStanjeService);

  readonly apiUrl = API_URL;
  readonly lokacija = this.lokacijaStanje.lokacija;

  odabranaSlikaIndex = 0;
  galerijaOtvorena = false;

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

  otvoriGaleriju(slika: SlikaLokacije): void {
    const lokacija = this.lokacija();

    if (!lokacija) return;

    const index = lokacija.slikeLokacije.findIndex(
      (slikaLokacije) => slikaLokacije.slikaId === slika.slikaId,
    );

    this.odabranaSlikaIndex = index === -1 ? 0 : index;
    this.galerijaOtvorena = true;

    document.body.classList.add('body--bez-scrolla');
  }

  zatvoriGaleriju(): void {
    this.galerijaOtvorena = false;
    document.body.classList.remove('body--bez-scrolla');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('body--bez-scrolla');
  }

  naZabiljeziDolazak() {}
}
