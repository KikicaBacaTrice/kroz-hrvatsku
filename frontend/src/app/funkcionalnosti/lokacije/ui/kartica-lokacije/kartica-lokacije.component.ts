import { Component, input } from '@angular/core';
import { OcjenaZvijezdiceComponent } from '../komentari-sekcija/ocjena-zvijezdice/ocjena-zvijezdice.component';
import { Lokacija, SlikaLokacije } from '../../modeli/lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kartica-lokacije',
  imports: [OcjenaZvijezdiceComponent, RouterLink],
  templateUrl: './kartica-lokacije.component.html',
  styleUrl: './kartica-lokacije.component.scss',
})
export class KarticaLokacijeComponent {
  lokacija = input.required<Lokacija>();

  readonly apiUrl = API_URL;

  glavnaSlika(): SlikaLokacije | null {
    return (
      this.lokacija().slikeLokacije.find((slika) => slika.glavna) ??
      this.lokacija().slikeLokacije[0] ??
      null
    );
  }
}
