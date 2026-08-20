import { Component, inject, OnInit, signal } from '@angular/core';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { Lokacija } from '../../../lokacije/modeli/lokacija.model';
import { RouterLink } from '@angular/router';
import { LokacijeIServis } from '../../../lokacije/podaci/lokacije-iservis';
import { LokacijaStanjeService } from '../../../lokacije/stanje/lokacija-stanje.service';

@Component({
  selector: 'app-uredivanje-lokacije',
  imports: [RouterLink],
  templateUrl: './uredivanje-lokacije.component.html',
  styleUrl: './uredivanje-lokacije.component.scss',
})
export class UredivanjeLokacijeComponent implements OnInit {
  readonly lokacijaStanje = inject(LokacijaStanjeService);

  readonly apiUrl = API_URL;
  readonly lokacije = signal<Lokacija[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  ngOnInit(): void {
    this.lokacijaStanje.ucitajLokacijeZaUredivanje();
  }

  glavnaSlika(lokacija: Lokacija) {
    return (
      lokacija.slikeLokacije.find((slika) => slika.glavna) ??
      lokacija.slikeLokacije[0]
    );
  }
}
