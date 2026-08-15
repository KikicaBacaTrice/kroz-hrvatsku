import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { MojProfil, UrediProfilaZahtjev } from '../../modeli/profil.model';
import { ZatovriIkonaComponent } from '../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uredi-profil-modal',
  imports: [ZatovriIkonaComponent, FormsModule],
  templateUrl: './uredi-profil-modal.component.html',
  styleUrl: './uredi-profil-modal.component.scss',
})
export class UrediProfilModalComponent implements OnInit {
  profil = input.required<MojProfil>();

  @Output() zatvori = new EventEmitter<void>();
  @Output() spremi = new EventEmitter<UrediProfilaZahtjev>();

  model: UrediProfilaZahtjev = {
    ime: null,
    prezime: null,
    korisnickoIme: '',
    opisProfila: null,
  };

  ngOnInit(): void {
    const profil = this.profil();

    this.model = {
      ime: profil.korisnik.ime,
      prezime: profil.korisnik.prezime,
      korisnickoIme: profil.korisnik.korisnickoIme,
      opisProfila: profil.opisProfila,
    };
  }

  posalji(): void {
    console.log(this.model);
    this.spremi.emit(this.model);
  }
}
