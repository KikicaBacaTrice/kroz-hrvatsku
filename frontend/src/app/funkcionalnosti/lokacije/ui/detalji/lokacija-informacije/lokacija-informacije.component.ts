import { Component, input } from '@angular/core';
import { Lokacija } from '../../../modeli/lokacija.model';
import { KarticaInformacijeDetaljaLokacijeComponent } from '../../kartice/kartica-informacije-detalja-lokacije/kartica-informacije-detalja-lokacije.component';

@Component({
  selector: 'app-lokacija-informacije',
  imports: [KarticaInformacijeDetaljaLokacijeComponent],
  templateUrl: './lokacija-informacije.component.html',
  styleUrl: './lokacija-informacije.component.scss',
})
export class LokacijaInformacijeComponent {
  lokacija = input.required<Lokacija>();
  rijeseno = input(false);

  formatirajCijenuUlaznice(): string {
    const iznos = Number(this.lokacija().ulaznicaCijena);

    if (!iznos) {
      return 'Besplatno';
    }

    return `${iznos.toFixed(2)}€ po osobi`;
  }
}
