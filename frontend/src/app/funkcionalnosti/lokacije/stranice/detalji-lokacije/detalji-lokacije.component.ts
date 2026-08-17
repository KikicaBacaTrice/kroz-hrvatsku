import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { KartaLokacijeComponent } from '../../ui/detalji/karta-lokacije/karta-lokacije.component';
import { KarticaIzazovaLokacijeComponent } from '../../ui/kartice/kartica-izazova-lokacije/kartica-izazova-lokacije.component';
import { LokacijaHeroComponent } from '../../ui/detalji/lokacija-hero/lokacija-hero.component';
import { LokacijaOpisComponent } from '../../ui/detalji/lokacija-opis/lokacija-opis.component';
import { LokacijaGalerijaComponent } from '../../ui/detalji/lokacija-galerija/lokacija-galerija.component';
import { LokacijaInformacijeComponent } from '../../ui/detalji/lokacija-informacije/lokacija-informacije.component';
import { SlikaLokacije } from '../../modeli/lokacija.model';
import { LokacijaGalerijaModalComponent } from '../../ui/detalji/lokacija-galerija-modal/lokacija-galerija-modal.component';
import { KomentariSekcijaComponent } from '../../ui/komentari-sekcija/komentari-sekcija.component';
import { KomentariLokacijeStanjeService } from '../../stanje/komentari-lokacije-stanje.service';
import { ZabiljeniDolazakModalComponent } from '../../ui/dolasci/zabiljeni-dolazak-modal/zabiljeni-dolazak-modal.component';
import { UspomenaDolazakModalComponent } from '../../ui/dolasci/uspomena-dolazak-modal/uspomena-dolazak-modal.component';
import { DolasciLokacijeStanjeService } from '../../stanje/dolasci-lokacije-stanje.service';
import { AuthStanjeService } from '../../../autentikacija/stanje/auth-stanje.service';

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
    KomentariSekcijaComponent,
    ZabiljeniDolazakModalComponent,
    UspomenaDolazakModalComponent,
  ],
  templateUrl: './detalji-lokacije.component.html',
  styleUrl: './detalji-lokacije.component.scss',
})
export class DetaljiLokacijeComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  readonly authStanje = inject(AuthStanjeService);
  readonly lokacijaStanje = inject(LokacijaStanjeService);
  readonly dolasciStanje = inject(DolasciLokacijeStanjeService);
  private readonly komentariStanje = inject(KomentariLokacijeStanjeService);

  readonly apiUrl = API_URL;
  readonly lokacija = this.lokacijaStanje.lokacija;

  odabranaSlikaIndex = 0;
  galerijaOtvorena = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametri) => {
      const lokacijaId = Number(parametri.get('id'));

      this.lokacijaStanje.ucitajLokaciju(lokacijaId);
      this.komentariStanje.ucitajKomentare(lokacijaId);
      if (this.authStanje.prijavljen()) {
        this.dolasciStanje.ucitajMojDolazak(lokacijaId);
      }
    });
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
}
