import { Component, input } from '@angular/core';
import { OcjenaZvijezdiceComponent } from '../../komentari-sekcija/ocjena-zvijezdice/ocjena-zvijezdice.component';
import { Lokacija, SlikaLokacije } from '../../../modeli/lokacija.model';
import { API_URL } from '../../../../../jezgra/konfiguracija/api.config';
import { RouterLink } from '@angular/router';
import { MedaljaIkonaComponent } from '../../../../../dijeljeno/ui/ikone/medalja-ikona/medalja-ikona.component';

@Component({
  selector: 'app-kartica-lokacije',
  imports: [OcjenaZvijezdiceComponent, RouterLink, MedaljaIkonaComponent],
  templateUrl: './kartica-lokacije.component.html',
  styleUrl: './kartica-lokacije.component.scss',
})
export class KarticaLokacijeComponent {
  lokacija = input.required<Lokacija>();
  rijesena = input(false);

  readonly apiUrl = API_URL;

  glavnaSlika(): SlikaLokacije | null {
    return (
      this.lokacija().slikeLokacije.find((slika) => slika.glavna) ??
      this.lokacija().slikeLokacije[0] ??
      null
    );
  }
}
