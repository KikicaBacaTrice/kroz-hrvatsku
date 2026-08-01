import { Component, input } from '@angular/core';
import { Lokacija } from '../../modeli/lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';

@Component({
  selector: 'app-lokacija-galerija',
  imports: [],
  templateUrl: './lokacija-galerija.component.html',
  styleUrl: './lokacija-galerija.component.scss',
})
export class LokacijaGalerijaComponent {
  lokacija = input.required<Lokacija>();
  readonly apiUrl = API_URL;

  sporedneSlike() {
    return this.lokacija().slikeLokacije.filter((slika) => !slika.glavna);
  }
}
