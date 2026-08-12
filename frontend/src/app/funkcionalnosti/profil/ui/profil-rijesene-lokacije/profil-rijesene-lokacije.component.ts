import { Component, input } from '@angular/core';
import { RijesenaLokacija } from '../../../lokacije/modeli/posjet-lokacija.model';
import { KarticaLokacijeComponent } from '../../../lokacije/ui/kartice/kartica-lokacije/kartica-lokacije.component';

@Component({
  selector: 'app-profil-rijesene-lokacije',
  imports: [KarticaLokacijeComponent],
  templateUrl: './profil-rijesene-lokacije.component.html',
  styleUrl: './profil-rijesene-lokacije.component.scss',
})
export class ProfilRijeseneLokacijeComponent {
  rijeseneLokacije = input.required<RijesenaLokacija[]>();
}
