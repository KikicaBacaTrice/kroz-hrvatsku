import { Component, input } from '@angular/core';
import { Lokacija } from '../../../modeli/lokacija.model';

@Component({
  selector: 'app-lokacija-opis',
  imports: [],
  templateUrl: './lokacija-opis.component.html',
  styleUrl: './lokacija-opis.component.scss',
})
export class LokacijaOpisComponent {
  lokacija = input.required<Lokacija>();

  paragrafOpisa(opis: string | null | undefined): string[] {
    return opis?.split(/\n\s*\n/).filter(Boolean) ?? [];
  }
}
