import { Component, input, OnDestroy } from '@angular/core';
import { Lokacija, SlikaLokacije } from '../../modeli/lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { LokacijaGalerijaModalComponent } from '../lokacija-galerija-modal/lokacija-galerija-modal.component';

@Component({
  selector: 'app-lokacija-galerija',
  imports: [LokacijaGalerijaModalComponent],
  templateUrl: './lokacija-galerija.component.html',
  styleUrl: './lokacija-galerija.component.scss',
})
export class LokacijaGalerijaComponent implements OnDestroy {
  lokacija = input.required<Lokacija>();
  readonly apiUrl = API_URL;
  odabranaSlikaIndex = 0;

  galerijaOtvorena = false;

  otvoriGaleriju(slika: SlikaLokacije): void {
    this.odabranaSlikaIndex = this.lokacija().slikeLokacije.findIndex(
      (slikaLokacije) => slikaLokacije.slikaId === slika.slikaId,
    );
    this.galerijaOtvorena = true;

    document.body.classList.add('body--bez-scrolla');
  }

  zatovriGaleriju(): void {
    this.galerijaOtvorena = false;

    document.body.classList.remove('body--bez-scrolla');
  }

  sporedneSlike(): SlikaLokacije[] {
    return this.lokacija().slikeLokacije.filter((slika) => !slika.glavna);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('body--bez-scrolla');
  }
}
