import { Component, effect, inject } from '@angular/core';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { ActivatedRoute } from '@angular/router';
import { Lokacija } from '../../modeli/lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { ZvijezdaIkonaComponent } from '../../../../dijeljeno/ui/ikone/zvijezda-ikona/zvijezda-ikona.component';
import { KarticaInformacijeDetaljaLokacijeComponent } from '../../ui/kartica-informacije-detalja-lokacije/kartica-informacije-detalja-lokacije.component';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { MedaljaIkonaComponent } from '../../../../dijeljeno/ui/ikone/medalja-ikona/medalja-ikona.component';
import { ZvijezdaKrugIkonaComponent } from '../../../../dijeljeno/ui/ikone/zvijezda-krug-ikona/zvijezda-krug-ikona.component';
import { KovaniceIkonaComponent } from '../../../../dijeljeno/ui/ikone/kovanice-ikona/kovanice-ikona.component';

@Component({
  selector: 'app-detalji-lokacije',
  imports: [
    ZvijezdaIkonaComponent,
    KarticaInformacijeDetaljaLokacijeComponent,
    MedaljaIkonaComponent,
    ZvijezdaKrugIkonaComponent,
    KovaniceIkonaComponent,
  ],
  templateUrl: './detalji-lokacije.component.html',
  styleUrl: './detalji-lokacije.component.scss',
})
export class DetaljiLokacijeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly lokacijaStanje = inject(LokacijaStanjeService);

  readonly apiUrl = API_URL;
  readonly lokacija = this.lokacijaStanje.lokacija;

  constructor() {
    effect(() => {
      console.log(this.lokacija());
    });
  }

  ngOnInit(): void {
    const lokacijaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isNaN(lokacijaId)) {
      this.lokacijaStanje.dohvatiPodatkeLokacije(lokacijaId);
    }
  }

  glavnaSlika(lokacija: Lokacija) {
    return (
      lokacija.slikeLokacije.find((slika) => slika.glavna) ??
      lokacija.slikeLokacije[0]
    );
  }

  formatirajCijenuUlaznice(cijena: number | string | null | undefined): string {
    const iznos = Number(cijena);

    if (!iznos) {
      return 'Besplatno';
    }

    return `${iznos.toFixed(2)}€ po osobi`;
  }

  paragrafOpisa(opis: string | null | undefined): string[] {
    return opis?.split(/\n\s*\n/).filter(Boolean) ?? [];
  }
}
