import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import {
  AzurirajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../../../modeli/komentarLokacije.model';
import { FormsModule, NgForm } from '@angular/forms';
import { OcjenaZvjezdicaComponent } from '../../../../../dijeljeno/ui/ikone/ocjena-zvjezdica/ocjena-zvjezdica.component';
import { ZatovriIkonaComponent } from '../../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';

@Component({
  selector: 'app-uredi-komentar-modal',
  imports: [FormsModule, OcjenaZvjezdicaComponent, ZatovriIkonaComponent],
  templateUrl: './uredi-komentar-modal.component.html',
  styleUrl: './uredi-komentar-modal.component.scss',
})
export class UrediKomentarModalComponent implements OnInit {
  komentar = input.required<KomentarLokacije>();

  @Output() zatvori = new EventEmitter<void>();
  @Output() spremi = new EventEmitter<AzurirajKomentarLokacijeZahtjev>();

  model = {
    ocjena: 0,
    tekst: '',
  };

  ngOnInit(): void {
    this.model = {
      ocjena: this.komentar().ocjena,
      tekst: this.komentar().tekst,
    };

    document.body.classList.add('--body--bez-scrolla');
  }

  postaviOcjenu(ocjena: number): void {
    this.model.ocjena = ocjena;
  }

  zatvoriModal(): void {
    document.body.classList.remove('body--bez-scrolla');
    this.zatvori.emit();
  }

  posalji(forma: NgForm): void {
    if (forma.invalid || this.model.ocjena === 0) {
      forma.control.markAllAsTouched();
      return;
    }

    this.spremi.emit({
      tekst: this.model.tekst,
      ocjena: this.model.ocjena,
    });
  }
}
