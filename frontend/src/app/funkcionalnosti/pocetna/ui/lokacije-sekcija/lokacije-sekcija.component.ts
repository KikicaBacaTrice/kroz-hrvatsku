import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { KarticaLokacijeComponent } from '../../../lokacije/ui/kartice/kartica-lokacije/kartica-lokacije.component';
import { RouterLink } from '@angular/router';
import { StrelicaIkonaComponent } from '../../../../dijeljeno/ui/ikone/strelica-ikona/strelica-ikona.component';
import { KartaHrvatskeComponent } from '../karta-hrvatske/karta-hrvatske.component';
import { Lokacija } from '../../../lokacije/modeli/lokacija.model';

@Component({
  selector: 'app-lokacije-sekcija',
  imports: [
    KarticaLokacijeComponent,
    RouterLink,
    StrelicaIkonaComponent,
    KartaHrvatskeComponent,
  ],
  templateUrl: './lokacije-sekcija.component.html',
  styleUrl: './lokacije-sekcija.component.scss',
})
export class LokacijeSekcijaComponent {
  odabranaZupanija = input<string | null>(null);
  lokacijeZupanije = input<Lokacija[]>([]);
  ucitavanjeLokacija = input(false);

  @Output() zupanijaOdabrana = new EventEmitter<string>();
}
