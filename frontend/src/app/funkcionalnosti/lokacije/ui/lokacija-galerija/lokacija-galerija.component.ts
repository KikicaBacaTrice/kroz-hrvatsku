import { Component, EventEmitter, input, Output } from '@angular/core';
import { Lokacija, SlikaLokacije } from '../../modeli/lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';

@Component({
  selector: 'app-lokacija-galerija',
  templateUrl: './lokacija-galerija.component.html',
  styleUrl: './lokacija-galerija.component.scss',
})
export class LokacijaGalerijaComponent {
  lokacija = input.required<Lokacija>();
  readonly apiUrl = API_URL;

  @Output() slikaKliknuta = new EventEmitter<SlikaLokacije>();

  otvoriGaleriju(slika: SlikaLokacije): void {
    this.slikaKliknuta.emit(slika);
  }

  sporedneSlike(): SlikaLokacije[] {
    return this.lokacija().slikeLokacije.filter((slika) => !slika.glavna);
  }
}
