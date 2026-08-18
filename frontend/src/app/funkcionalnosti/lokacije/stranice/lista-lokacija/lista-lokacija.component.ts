import { Component, inject, signal } from '@angular/core';
import { KarticaLokacijeComponent } from '../../ui/kartice/kartica-lokacije/kartica-lokacije.component';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { FilterLokacija } from '../../modeli/filter-lokacija.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KategorijeStanjeService } from '../../stanje/kategorije-stanje.service';
import { DolasciLokacijeStanjeService } from '../../stanje/dolasci-lokacije-stanje.service';
import { FilterLokacijaFormaComponent } from '../../ui/filteri/filter-lokacija-forma/filter-lokacija-forma.component';
import { AuthStanjeService } from '../../../autentikacija/stanje/auth-stanje.service';

@Component({
  selector: 'app-lista-lokacija',
  imports: [
    KarticaLokacijeComponent,
    FormsModule,
    FilterLokacijaFormaComponent,
  ],
  templateUrl: './lista-lokacija.component.html',
  styleUrl: './lista-lokacija.component.scss',
})
export class ListaLokacijaComponent {
  private readonly authStanje = inject(AuthStanjeService);
  private readonly lokacijaStanje = inject(LokacijaStanjeService);
  private readonly kategorijeStanje = inject(KategorijeStanjeService);
  private readonly dolasciStanje = inject(DolasciLokacijeStanjeService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly kategorije = this.kategorijeStanje.kategorije;
  readonly dolasci = this.dolasciStanje;
  readonly lokacije = this.lokacijaStanje.lokacije;
  readonly ucitavanje = this.lokacijaStanje.ucitavanje;
  readonly greska = this.lokacijaStanje.greska;

  filter: FilterLokacija = {
    pretraziNaziv: '',
    zupanija: '',
    grad: '',
    kategorija: '',
  };

  ngOnInit(): void {
    this.kategorijeStanje.ucitajKategorije();

    if (this.authStanje.prijavljen()) {
      this.dolasciStanje.ucitajRijeseneLokacije();
    }

    this.route.queryParams.subscribe((params) => {
      this.filter = {
        pretraziNaziv: params['pretraziNaziv'] ?? '',
        zupanija: params['zupanija'] ?? '',
        grad: params['grad'] ?? '',
        kategorija: params['kategorija'] ?? '',
      };

      this.lokacijaStanje.ucitajLokacije(this.ocistiFilter(this.filter));
    });
  }

  primijeniFilter(filter: FilterLokacija): void {
    const ocisceniFilter = this.ocistiFilter(filter);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: ocisceniFilter,
    });
  }

  resetirajFilter(): void {
    this.filter = {
      pretraziNaziv: '',
      zupanija: '',
      grad: '',
      kategorija: '',
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  private ocistiFilter(filter: FilterLokacija): FilterLokacija {
    return Object.fromEntries(
      Object.entries(filter).filter(([, vrijednost]) => vrijednost),
    ) as FilterLokacija;
  }
}
