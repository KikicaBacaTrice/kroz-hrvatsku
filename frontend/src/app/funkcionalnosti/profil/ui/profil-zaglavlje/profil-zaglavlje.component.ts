import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { MojProfil } from '../../modeli/profil.model';
import { UredivanjeIkonaComponent } from '../../../../dijeljeno/ui/ikone/uredivanje-ikona/uredivanje-ikona.component';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { ZatovriIkonaComponent } from '../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';

@Component({
  selector: 'app-profil-zaglavlje',
  imports: [UredivanjeIkonaComponent, ZatovriIkonaComponent],
  templateUrl: './profil-zaglavlje.component.html',
  styleUrl: './profil-zaglavlje.component.scss',
})
export class ProfilZaglavljeComponent {
  profil = input.required<MojProfil>();

  readonly apiUrl = API_URL;

  @Output() bedzPozicijaKliknuta = new EventEmitter();
  @Output() urediProfilKliknut = new EventEmitter();
  @Output() promjenaSlikeKliknuta = new EventEmitter();
  @Output() obrisiProfilnuSlikuKliknuta = new EventEmitter();

  odaberiBedzPoziciju(pozicija: 1 | 2 | 3): void {
    this.bedzPozicijaKliknuta.emit(pozicija);
  }
}
