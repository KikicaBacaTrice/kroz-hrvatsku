import {
  Component,
  EventEmitter,
  input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LokacijaFormaModel } from '../../modeli/lokacija-forma.mode';
import { FormsModule, NgForm } from '@angular/forms';
import { KategorijaLokacije } from '../../../lokacije/modeli/lokacija.model';

@Component({
  selector: 'app-lokacija-forma',
  imports: [FormsModule],
  templateUrl: './lokacija-forma.component.html',
  styleUrl: './lokacija-forma.component.scss',
})
export class LokacijaFormaComponent implements OnChanges {
  kategorije = input<KategorijaLokacije[]>([]);

  nacin = input<'dodavanje' | 'uredivanje'>('dodavanje');
  pocetnaVrijednost = input<Partial<LokacijaFormaModel> | null>(null);

  @Output() spremi = new EventEmitter<LokacijaFormaModel>();
  @Output() odustani = new EventEmitter<void>();

  model: LokacijaFormaModel = {
    naziv: '',
    opis: '',
    adresa: '',
    grad: '',
    zupanija: '',
    ulaznicaCijena: 0,
    geoSirina: 0,
    geoDuzina: 0,
    nagradaXp: 0,
    nagradaValuta: 0,
    kategorijaId: 1,
  };

  ngOnChanges(promjene: SimpleChanges): void {
    if (promjene['pocetnaVrijednost'] && this.pocetnaVrijednost()) {
      this.model = {
        ...this.model,
        ...this.pocetnaVrijednost(),
      };
    }
  }

  posalji(forma: NgForm): void {
    if (forma.invalid) {
      forma.control.markAllAsTouched();
      return;
    }

    const zahtjev = {
      ...this.model,
      ulaznicaCijena: Number(this.model.ulaznicaCijena),
      geoSirina: Number(this.model.geoSirina),
      geoDuzina: Number(this.model.geoDuzina),
      nagradaXp: Number(this.model.nagradaXp),
      nagradaValuta: Number(this.model.nagradaValuta),
      kategorijaId: Number(this.model.kategorijaId),
    };

    this.spremi.emit(zahtjev);
  }
}
