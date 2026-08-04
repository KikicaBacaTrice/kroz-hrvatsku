import { Component, computed, inject, input } from '@angular/core';
import { OcjenaZvijezdiceComponent } from './ocjena-zvijezdice/ocjena-zvijezdice.component';
import { KomentarKarticaComponent } from './komentar-kartica/komentar-kartica.component';
import { KomentariLokacijeStanjeService } from '../../stanje/komentari-lokacije-stanje.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-komentari-sekcija',
  imports: [OcjenaZvijezdiceComponent, KomentarKarticaComponent, DecimalPipe],
  templateUrl: './komentari-sekcija.component.html',
  styleUrl: './komentari-sekcija.component.scss',
})
export class KomentariSekcijaComponent {
  readonly komentariStanje = inject(KomentariLokacijeStanjeService);
  lokacijaId = input.required<number>();

  brojKomentara = computed(() => {
    return this.komentariStanje.komentari().length;
  });

  prosjecnaOcjena = computed(() => {
    const komentari = this.komentariStanje.komentari();

    if (komentari.length === 0) return 0;

    const zbroj = komentari.reduce((ukupno, komentari) => {
      return ukupno + komentari.ocjena;
    }, 0);

    return zbroj / komentari.length;
  });

  raspodjelaOcjena = computed(() => {
    const komentari = this.komentariStanje.komentari();
    const ukupnoKomentara = komentari.length;

    return [5, 4, 3, 2, 1].map((ocjena) => {
      const broj = komentari.filter(
        (komentar) => komentar.ocjena === ocjena,
      ).length;

      return {
        ocjena,
        broj,
        postotak: ukupnoKomentara === 0 ? 0 : (broj / ukupnoKomentara) * 100,
      };
    });
  });

  ngOnInit(): void {
    this.komentariStanje.ucitajKomentare(this.lokacijaId());
  }
}
