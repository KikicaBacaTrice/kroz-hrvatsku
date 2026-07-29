import { Component, effect, inject } from '@angular/core';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { ActivatedRoute } from '@angular/router';
import { Lokacija } from '../../modeli/lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { ZvijezdaIkonaComponent } from '../../../../dijeljeno/ui/ikone/zvijezda-ikona/zvijezda-ikona.component';

@Component({
  selector: 'app-detalji-lokacije',
  imports: [ZvijezdaIkonaComponent],
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
}
