import { Component, inject, signal } from '@angular/core';
import { AuthStanjeService } from '../../../autentikacija/stanje/auth-stanje.service';
import { HeroSekcijaComponent } from '../../ui/hero-sekcija/hero-sekcija.component';
import { LokacijeSekcijaComponent } from '../../ui/lokacije-sekcija/lokacije-sekcija.component';
import { PosjetSekcijaComponent } from '../../ui/posjet-sekcija/posjet-sekcija.component';
import { TvojaPricaComponent } from '../../ui/tvoja-prica/tvoja-prica.component';
import { ZapocniPutovanjeComponent } from '../../ui/zapocni-putovanje/zapocni-putovanje.component';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import { Lokacija } from '../../../lokacije/modeli/lokacija.model';

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
  private readonly lokacijeHttp = inject(LokacijeHttpService);

  odabranaZupanija = signal<string | null>(null);
  lokacijeZupanije = signal<Lokacija[]>([]);
  ucitavanjeLokacija = signal(false);

  odaberiZupaniju(zupanija: string) {
    this.odabranaZupanija.set(zupanija);
    this.ucitavanjeLokacija.set(true);

    this.lokacijeHttp.dohvatiSveLokacije({ zupanija }).subscribe({
      next: (lokacije) => {
        this.lokacijeZupanije.set(
          lokacije
            .sort((a, b) => (b.prosjecnaOcjena ?? 0) - (a.prosjecnaOcjena ?? 0))
            .slice(0, 1),
        );
        this.ucitavanjeLokacija.set(false);
      },
      error: () => {
        this.lokacijeZupanije.set([]);
        this.ucitavanjeLokacija.set(false);
      },
    });
  }
}
