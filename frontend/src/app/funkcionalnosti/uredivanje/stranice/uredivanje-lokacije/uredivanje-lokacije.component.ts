import { Component, inject, OnInit, signal } from '@angular/core';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { single } from 'rxjs';
import { Lokacija } from '../../../lokacije/modeli/lokacija.model';
import { RouterLink } from '@angular/router';
import { StrelicaIkonaComponent } from '../../../../dijeljeno/ui/ikone/strelica-ikona/strelica-ikona.component';

@Component({
  selector: 'app-uredivanje-lokacije',
  imports: [RouterLink, StrelicaIkonaComponent],
  templateUrl: './uredivanje-lokacije.component.html',
  styleUrl: './uredivanje-lokacije.component.scss',
})
export class UredivanjeLokacijeComponent implements OnInit {
  private readonly lokacijeHttp = inject(LokacijeHttpService);

  readonly apiUrl = API_URL;
  readonly lokacije = signal<Lokacija[]>([]);
  readonly ucitavanje = signal(false);
  readonly greska = signal<string | null>(null);

  ngOnInit(): void {
    this.ucitajLokacije();
  }

  ucitajLokacije(): void {
    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeHttp.dohvatiSveLokacije().subscribe({
      next: (lokacije) => {
        this.lokacije.set(
          [...lokacije].sort((a, b) => a.lokacijaId - b.lokacijaId),
        );
        this.ucitavanje.set(false);
      },
      error: () => {
        this.greska.set('Došlo je do pogreške pri učitavanju lokacija');
        this.ucitavanje.set(false);
      },
    });
  }

  obrisiLokaciju(lokacija: Lokacija): void {
    const potvrdeno = confirm(
      `Jeste li sigurni da želite obrisati lokaciju ${lokacija.naziv}`,
    );

    if (!potvrdeno) {
      return;
    }

    this.ucitavanje.set(true);
    this.greska.set(null);

    this.lokacijeHttp.obrisiLokaciju(lokacija.lokacijaId).subscribe({
      next: () => {
        this.lokacije.update((lokacije) =>
          lokacije.filter(
            (trenutnaLokacija) =>
              trenutnaLokacija.lokacijaId !== lokacija.lokacijaId,
          ),
        );

        this.ucitavanje.set(false);
      },
      error: () => {
        this.greska.set('Došlo je do pogreške pri brisanju lokacije');
        this.ucitavanje.set(false);
      },
    });
  }

  glavnaSlika(lokacija: Lokacija) {
    return (
      lokacija.slikeLokacije.find((slika) => slika.glavna) ??
      lokacija.slikeLokacije[0]
    );
  }
}
