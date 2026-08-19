import { Component, inject, signal } from '@angular/core';
import { AuthStanjeService } from '../../../autentikacija/stanje/auth-stanje.service';
import { HeroSekcijaComponent } from '../../ui/hero-sekcija/hero-sekcija.component';
import { LokacijeSekcijaComponent } from '../../ui/lokacije-sekcija/lokacije-sekcija.component';
import { PosjetSekcijaComponent } from '../../ui/posjet-sekcija/posjet-sekcija.component';
import { TvojaPricaComponent } from '../../ui/tvoja-prica/tvoja-prica.component';
import { ZapocniPutovanjeComponent } from '../../ui/zapocni-putovanje/zapocni-putovanje.component';
import { LokacijaStanjeService } from '../../../lokacije/stanje/lokacija-stanje.service';

@Component({
  selector: 'app-pocetna',
  imports: [
    HeroSekcijaComponent,
    LokacijeSekcijaComponent,
    PosjetSekcijaComponent,
    TvojaPricaComponent,
    ZapocniPutovanjeComponent,
  ],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.scss',
})
export class PocetnaComponent {
  readonly authStanje = inject(AuthStanjeService);
  readonly lokacijaStanje = inject(LokacijaStanjeService);

  odaberiZupaniju(zupanija: string): void {
    this.lokacijaStanje.ucitajTopLokacijePoZupaniji(zupanija);
  }
}
