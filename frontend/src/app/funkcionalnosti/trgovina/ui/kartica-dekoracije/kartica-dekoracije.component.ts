import { Component, input } from '@angular/core';
import { Dekoracija } from '../../modeli/dekoracija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';

@Component({
  selector: 'app-kartica-dekoracije',
  imports: [],
  templateUrl: './kartica-dekoracije.component.html',
  styleUrl: './kartica-dekoracije.component.scss',
})
export class KarticaDekoracijeComponent {
  dekoracija = input.required<Dekoracija>();
  readonly apiUrl = API_URL;
}
