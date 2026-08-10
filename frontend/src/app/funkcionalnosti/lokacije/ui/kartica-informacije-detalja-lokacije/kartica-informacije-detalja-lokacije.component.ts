import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kartica-informacije-detalja-lokacije',
  imports: [],
  templateUrl: './kartica-informacije-detalja-lokacije.component.html',
  styleUrl: './kartica-informacije-detalja-lokacije.component.scss',
})
export class KarticaInformacijeDetaljaLokacijeComponent {
  ikona = input.required<string>();
  opis = input.required<string>();
  vrijednost = input.required<string>();
  rijeseno = input(false);
}
