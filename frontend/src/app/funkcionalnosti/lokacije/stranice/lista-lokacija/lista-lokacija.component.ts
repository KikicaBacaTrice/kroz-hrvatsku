import { Component, inject } from '@angular/core';
import { KarticaLokacijeComponent } from '../../ui/kartica-lokacije/kartica-lokacije.component';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { FilterLokacija } from '../../modeli/filter-lokacija.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-lokacija',
  imports: [KarticaLokacijeComponent, FormsModule],
  templateUrl: './lista-lokacija.component.html',
  styleUrl: './lista-lokacija.component.scss',
})
export class ListaLokacijaComponent {
  private readonly lokacijaStanje = inject(LokacijaStanjeService);

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
    this.lokacijaStanje.ucitajLokacije();
  }

  primijeniFilter(): void {
    this.lokacijaStanje.ucitajLokacije(this.ocistiFilter(this.filter));
  }

  resetirajFilter(): void {
    this.filter = {
      pretraziNaziv: '',
      zupanija: '',
      grad: '',
      kategorija: '',
    };

    this.lokacijaStanje.resetirajFilter();
  }

  private ocistiFilter(filter: FilterLokacija): FilterLokacija {
    return Object.fromEntries(
      Object.entries(filter).filter(([, vrijednost]) => vrijednost),
    ) as FilterLokacija;
  }
}
