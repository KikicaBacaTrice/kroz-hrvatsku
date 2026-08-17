import { Component, computed, inject, input, signal } from '@angular/core';
import { OcjenaZvijezdiceComponent } from './ocjena-zvijezdice/ocjena-zvijezdice.component';
import { KomentarKarticaComponent } from './komentar-kartica/komentar-kartica.component';
import { KomentariLokacijeStanjeService } from '../../stanje/komentari-lokacije-stanje.service';
import { DecimalPipe } from '@angular/common';
import { DodajKomentarFormaComponent } from './dodaj-komentar-forma/dodaj-komentar-forma.component';
import { ProfilStanjeService } from '../../../profil/stanje/profil-stanje.service';
import {
  AzurirajKomentarLokacijeZahtjev,
  DodajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../../modeli/komentarLokacije.model';
import { AuthStanjeService } from '../../../autentikacija/stanje/auth-stanje.service';
import { LokacijaStanjeService } from '../../stanje/lokacija-stanje.service';
import { UrediKomentarModalComponent } from './uredi-komentar-modal/uredi-komentar-modal.component';

@Component({
  selector: 'app-komentari-sekcija',
  imports: [
    OcjenaZvijezdiceComponent,
    KomentarKarticaComponent,
    DecimalPipe,
    DodajKomentarFormaComponent,
    UrediKomentarModalComponent,
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

  komentarZaUredivanje = signal<KomentarLokacije | null>(null);
  brojPrikazanihKomentara = signal(3);

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

  prikazaniKomentari = computed(() => {
    return this.komentariStanje
      .komentari()
      .slice(0, this.brojPrikazanihKomentara());
  });

  imaJosKomentara = computed(() => {
    return (
      this.brojPrikazanihKomentara() < this.komentariStanje.komentari().length
    );
  });

  ngOnInit(): void {
    if (this.authStanje.prijavljen() && !this.profilStanje.profil()) {
      this.profilStanje.ucitajMojProfil();
    }
  }

  prikaziViseKomentara(): void {
    this.brojPrikazanihKomentara.update((broj) => broj + 3);
  }

  dodajKomentar(komentar: DodajKomentarLokacijeZahtjev) {
    this.komentariStanje.dodajKomentar(this.lokacijaId(), komentar);
  }

  zapocniUredivanjeKomentara(komentar: KomentarLokacije) {
    this.komentarZaUredivanje.set(komentar);
  }
  zatovriUredivanjeKomentara(): void {
    this.komentarZaUredivanje.set(null);
  }

  spremiUredeniKomentar(zahtjev: AzurirajKomentarLokacijeZahtjev): void {
    const kometar = this.komentarZaUredivanje();

    if (!kometar) return;

    this.komentariStanje.urediKomentar(
      this.lokacijaId(),
      kometar.povratnaInformacijaId,
      zahtjev,
    );

    this.komentarZaUredivanje.set(null);
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
