import { Component, EventEmitter, input, Output, output } from '@angular/core';
import { Lokacija, SlikaLokacije } from '../../modeli/lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { OcjenaZvijezdiceComponent } from '../komentari-sekcija/ocjena-zvijezdice/ocjena-zvijezdice.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-lokacija-hero',
  imports: [OcjenaZvijezdiceComponent, DecimalPipe],
  templateUrl: './lokacija-hero.component.html',
  styleUrl: './lokacija-hero.component.scss',
})
export class LokacijaHeroComponent {
  lokacija = input.required<Lokacija>();

  @Output() slikaKliknuta = new EventEmitter<SlikaLokacije>();

  readonly apiUrl = API_URL;

  glavnaSlika(): SlikaLokacije | undefined {
    return (
      this.lokacija().slikeLokacije.find((slika) => slika.glavna) ??
      this.lokacija().slikeLokacije[0]
    );
  }

  otvoriSliku(slika: SlikaLokacije): void {
    this.slikaKliknuta.emit(slika);
  }
}
