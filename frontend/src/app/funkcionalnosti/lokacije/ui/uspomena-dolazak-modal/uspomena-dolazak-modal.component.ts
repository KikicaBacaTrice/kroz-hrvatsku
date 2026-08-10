import { Component, EventEmitter, input, Output } from '@angular/core';
import { RijesenaLokacija } from '../../modeli/posjet-lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { ZatovriIkonaComponent } from '../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-uspomena-dolazak-modal',
  imports: [ZatovriIkonaComponent, DatePipe],
  templateUrl: './uspomena-dolazak-modal.component.html',
  styleUrl: './uspomena-dolazak-modal.component.scss',
})
export class UspomenaDolazakModalComponent {
  dolazak = input.required<RijesenaLokacija>();

  @Output() zatvori = new EventEmitter<void>();

  readonly apiUrl = API_URL;
}
