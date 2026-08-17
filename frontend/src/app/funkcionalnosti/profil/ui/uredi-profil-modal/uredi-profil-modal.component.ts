import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import {
  MojProfil,
  ProfilBedz,
  UrediProfilaZahtjev,
} from '../../modeli/profil.model';
import { ZatovriIkonaComponent } from '../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';
import { FormsModule } from '@angular/forms';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';

@Component({
  selector: 'app-uredi-profil-modal',
  imports: [ZatovriIkonaComponent, FormsModule],
  templateUrl: './uredi-profil-modal.component.html',
  styleUrl: './uredi-profil-modal.component.scss',
})
export class UrediProfilModalComponent implements OnInit {
  profil = input.required<MojProfil>();
  pozadine = input.required<ProfilBedz[]>();
  dekoracijeAvatara = input.required<ProfilBedz[]>();

  @Output() zatvori = new EventEmitter<void>();
  @Output() spremi = new EventEmitter<UrediProfilaZahtjev>();
  @Output() pozadinaOdabrana = new EventEmitter<number>();
  @Output() dekoracijaAvataraOdabrana = new EventEmitter<number>();
  @Output() defaultPozadinaOdabrana = new EventEmitter<void>();
  @Output() defaultDekoracijaAvataraOdabrana = new EventEmitter<void>();

  readonly apiUrl = API_URL;

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
