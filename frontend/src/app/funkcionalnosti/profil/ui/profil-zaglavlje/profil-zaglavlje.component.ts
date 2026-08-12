import { Component, input } from '@angular/core';
import { MojProfil } from '../../modeli/profil.model';

@Component({
  selector: 'app-profil-zaglavlje',
  imports: [],
  templateUrl: './profil-zaglavlje.component.html',
  styleUrl: './profil-zaglavlje.component.scss',
})
export class ProfilZaglavljeComponent {
  profil = input.required<MojProfil>();
}
