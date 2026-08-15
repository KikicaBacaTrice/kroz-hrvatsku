import { Component, EventEmitter, input, Output } from '@angular/core';
import { ProfilBedz } from '../../modeli/profil.model';
import { ZatovriIkonaComponent } from '../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';

@Component({
  selector: 'app-odabir-bedzeva-modal',
  imports: [ZatovriIkonaComponent],
  templateUrl: './odabir-bedzeva-modal.component.html',
  styleUrl: './odabir-bedzeva-modal.component.scss',
})
export class OdabirBedzevaModalComponent {
  pozicija = input.required<1 | 2 | 3>();
  bedzevi = input.required<ProfilBedz[]>();

  @Output() zatvori = new EventEmitter();
  @Output() bedzOdabran = new EventEmitter();
}
