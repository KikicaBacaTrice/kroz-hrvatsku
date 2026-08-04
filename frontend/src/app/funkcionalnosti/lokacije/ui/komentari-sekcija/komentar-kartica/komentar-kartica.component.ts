import { Component, inject, input } from '@angular/core';
import { OcjenaZvijezdiceComponent } from '../ocjena-zvijezdice/ocjena-zvijezdice.component';
import { KomentarLokacije } from '../../../modeli/komentarLokacije.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-komentar-kartica',
  imports: [OcjenaZvijezdiceComponent, DatePipe],
  templateUrl: './komentar-kartica.component.html',
  styleUrl: './komentar-kartica.component.scss',
})
export class KomentarKarticaComponent {
  komentar = input.required<KomentarLokacije>();
}
