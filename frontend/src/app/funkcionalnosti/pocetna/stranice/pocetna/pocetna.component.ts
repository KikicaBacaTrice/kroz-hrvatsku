import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KartaHrvatskeComponent } from '../../ui/karta-hrvatske/karta-hrvatske.component';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import { Lokacija } from '../../../lokacije/modeli/lokacija.model';
import { KarticaLokacijeComponent } from '../../../lokacije/ui/kartice/kartica-lokacije/kartica-lokacije.component';
import { StrelicaIkonaComponent } from '../../../../dijeljeno/ui/ikone/strelica-ikona/strelica-ikona.component';

@Component({
  selector: 'app-pocetna',
  imports: [
    RouterLink,
    KartaHrvatskeComponent,
    KarticaLokacijeComponent,
    StrelicaIkonaComponent,
  ],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.scss',
})
export class PocetnaComponent {
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
