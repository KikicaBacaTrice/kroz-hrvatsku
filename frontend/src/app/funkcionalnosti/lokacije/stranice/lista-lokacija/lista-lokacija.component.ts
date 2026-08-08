import { Component, inject, signal } from '@angular/core';
import { KarticaLokacijeComponent } from '../../ui/kartica-lokacije/kartica-lokacije.component';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { FilterLokacija } from '../../modeli/filter-lokacija.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KategorijeHttpService } from '../../podaci/kategorije-http.service';
import { single } from 'rxjs';
import { KategorijaLokacije } from '../../modeli/lokacija.model';
import { KategorijeStanjeService } from '../../stanje/kategorije-stanje.service';

@Component({
  selector: 'app-lista-lokacija',
  imports: [KarticaLokacijeComponent, FormsModule],
  templateUrl: './lista-lokacija.component.html',
  styleUrl: './lista-lokacija.component.scss',
})
export class ListaLokacijaComponent {
  private readonly lokacijaStanje = inject(LokacijaStanjeService);
  private readonly kategorijeStanje = inject(KategorijeStanjeService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly lokacije = this.lokacijaStanje.lokacije;
  readonly kategorije = this.kategorijeStanje.kategorije;
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

  primijeniFilter(): void {
    const filter = this.ocistiFilter(this.filter);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filter,
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
