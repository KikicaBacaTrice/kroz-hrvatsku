import { Component, EventEmitter, input, Output } from '@angular/core';
import { ProfilSlikaPosjeta } from '../../modeli/profil.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';

@Component({
  selector: 'app-profil-galerija-posjeta',
  imports: [],
  templateUrl: './profil-galerija-posjeta.component.html',
  styleUrl: './profil-galerija-posjeta.component.scss',
})
export class ProfilGalerijaPosjetaComponent {
  slike = input.required<ProfilSlikaPosjeta[]>();

  @Output() slikaKliknuta = new EventEmitter<number>();

  readonly apiUrl = API_URL;
}
