import { Component, EventEmitter, input, Output } from '@angular/core';
import { Dekoracija } from '../../modeli/dekoracija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { NovacIkonaComponent } from '../../../../dijeljeno/ui/ikone/novac-ikona/novac-ikona.component';

@Component({
  selector: 'app-kartica-dekoracije',
  imports: [NovacIkonaComponent],
  templateUrl: './kartica-dekoracije.component.html',
  styleUrl: './kartica-dekoracije.component.scss',
})
export class KarticaDekoracijeComponent {
  dekoracija = input.required<Dekoracija>();
  kupljena = input(false);

  @Output() kupi = new EventEmitter<number>();

  readonly apiUrl = API_URL;
}
