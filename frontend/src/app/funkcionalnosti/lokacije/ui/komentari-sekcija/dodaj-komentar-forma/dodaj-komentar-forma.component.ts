import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OcjenaZvjezdicaComponent } from '../../../../../dijeljeno/ui/ikone/ocjena-zvjezdica/ocjena-zvjezdica.component';
import { KomentariLokacijeStanjeService } from '../../../stanje/komentari-lokacije-stanje.service';
import { DodajKomentarLokacijeZahtjev } from '../../../modeli/komentarLokacije.model';

@Component({
  selector: 'app-dodaj-komentar-forma',
  imports: [FormsModule, OcjenaZvjezdicaComponent],
  templateUrl: './dodaj-komentar-forma.component.html',
  styleUrl: './dodaj-komentar-forma.component.scss',
})
export class DodajKomentarFormaComponent {
  @Output() dodajKomentar = new EventEmitter<DodajKomentarLokacijeZahtjev>();

  model = {
    ocjena: 0,
    tekst: '',
  };

  postaviOcjenu(ocjena: number): void {
    this.model.ocjena = ocjena;
  }

  posalji(forma: NgForm): void {
    if (forma.invalid || this.model.ocjena === 0) {
      forma.control.markAllAsTouched();
      return;
    }

    this.dodajKomentar.emit({
      tekst: this.model.tekst,
      ocjena: this.model.ocjena,
    });

    forma.resetForm({
      ocjena: 0,
      tekst: '',
    });
    this.model.ocjena = 0;
    this.model.tekst = '';
  }
}
