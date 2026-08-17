import {
  Component,
  EventEmitter,
  input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FilterLokacija } from '../../../modeli/filter-lokacija.model';
import { KategorijaLokacije } from '../../../modeli/lokacija.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-lokacija-forma',
  imports: [FormsModule],
  templateUrl: './filter-lokacija-forma.component.html',
  styleUrl: './filter-lokacija-forma.component.scss',
})
export class FilterLokacijaFormaComponent implements OnChanges {
  filter = input<FilterLokacija>({
    pretraziNaziv: '',
    zupanija: '',
    grad: '',
    kategorija: '',
  });

  kategorije = input<KategorijaLokacije[]>([]);

  @Output() primijeni = new EventEmitter<FilterLokacija>();
  @Output() resetiraj = new EventEmitter<void>();

  model: FilterLokacija = {
    pretraziNaziv: '',
    zupanija: '',
    grad: '',
    kategorija: '',
  };

  ngOnChanges(promjene: SimpleChanges): void {
    if (promjene['filter']) {
      this.model = {
        pretraziNaziv: this.filter().pretraziNaziv ?? '',
        zupanija: this.filter().zupanija ?? '',
        grad: this.filter().grad ?? '',
        kategorija: this.filter().kategorija ?? '',
      };
    }
  }

  posalji(): void {
    this.primijeni.emit(this.model);
  }

  resetirajFormu(): void {
    this.model = {
      pretraziNaziv: '',
      zupanija: '',
      grad: '',
      kategorija: '',
    };

    this.resetiraj.emit();
  }
}
