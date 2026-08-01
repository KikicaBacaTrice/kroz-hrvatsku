import { Component, EventEmitter, input, Output } from '@angular/core';
import { Lokacija } from '../../modeli/lokacija.model';
import { MedaljaIkonaComponent } from '../../../../dijeljeno/ui/ikone/medalja-ikona/medalja-ikona.component';
import { ZvijezdaKrugIkonaComponent } from '../../../../dijeljeno/ui/ikone/zvijezda-krug-ikona/zvijezda-krug-ikona.component';
import { KovaniceIkonaComponent } from '../../../../dijeljeno/ui/ikone/kovanice-ikona/kovanice-ikona.component';

@Component({
  selector: 'app-kartica-izazova-lokacije',
  imports: [
    MedaljaIkonaComponent,
    ZvijezdaKrugIkonaComponent,
    KovaniceIkonaComponent,
  ],
  templateUrl: './kartica-izazova-lokacije.component.html',
  styleUrl: './kartica-izazova-lokacije.component.scss',
})
export class KarticaIzazovaLokacijeComponent {
  lokacija = input.required<Lokacija>();

  @Output() zabiljeziDolazak = new EventEmitter<void>();

  naZabiljeziDolazak(): void {
    this.zabiljeziDolazak.emit();
  }
}
