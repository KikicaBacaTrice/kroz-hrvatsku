import { Component, computed, inject, input } from '@angular/core';
import { OcjenaZvijezdiceComponent } from './ocjena-zvijezdice/ocjena-zvijezdice.component';
import { KomentarKarticaComponent } from './komentar-kartica/komentar-kartica.component';
import { KomentariLokacijeStanjeService } from '../../stanje/komentari-lokacije-stanje.service';
import { DecimalPipe } from '@angular/common';
import { DodajKomentarFormaComponent } from './dodaj-komentar-forma/dodaj-komentar-forma.component';
import { ProfilStanjeService } from '../../../profil/stanje/profil-stanje.service';
import {
  DodajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../../modeli/komentarLokacije.model';
import { AuthStanjeService } from '../../../autentikacija/stanje/auth-stanje.service';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';

@Component({
  selector: 'app-komentari-sekcija',
  imports: [
    OcjenaZvijezdiceComponent,
    KomentarKarticaComponent,
    DecimalPipe,
    DodajKomentarFormaComponent,
  ],
  templateUrl: './komentari-sekcija.component.html',
  styleUrl: './komentari-sekcija.component.scss',
})
export class KomentariSekcijaComponent {
  readonly komentariStanje = inject(KomentariLokacijeStanjeService);
  readonly profilStanje = inject(ProfilStanjeService);
  readonly authStanje = inject(AuthStanjeService);
  readonly lokacijaStanje = inject(LokacijaStanjeService);
  lokacijaId = input.required<number>();

  brojKomentara = computed(() => {
    return this.lokacijaStanje.lokacija()?.brojOcjena ?? 0;
  });

  prosjecnaOcjena = computed(() => {
    return this.lokacijaStanje.lokacija()?.prosjecnaOcjena ?? 0;
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

    if (!this.profilStanje.profil()) {
      this.profilStanje.ucitajMojProfil();
    }
  }

  dodajKomentar(komentar: DodajKomentarLokacijeZahtjev) {
    this.komentariStanje.dodajKomentar(this.lokacijaId(), komentar);
  }

  zapocniUredivanjeKomentara(komentar: KomentarLokacije) {
    console.log('uredi', komentar);
  }
  obrisiKomentar(komentar: KomentarLokacije) {
    const potvrdeno = confirm('Jeste li sigurni da želite obrisati komentar');

    if (!potvrdeno) return;

    this.komentariStanje.obrisiKomentar(
      this.lokacijaId(),
      komentar.povratnaInformacijaId,
    );
  }
}
