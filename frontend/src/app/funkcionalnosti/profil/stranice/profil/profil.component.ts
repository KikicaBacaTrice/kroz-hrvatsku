import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfilStanjeService } from '../../stanje/profil-stanje.service';
import { DolasciLokacijeStanjeService } from '../../../lokacije/stanje/dolasci-lokacije-stanje.service';
import { ProfilStatistikaComponent } from '../../ui/profil-statistika/profil-statistika.component';
import { ProfilGalerijaPosjetaComponent } from '../../ui/profil-galerija-posjeta/profil-galerija-posjeta.component';
import { ModalGalerijaPosjetaComponent } from '../../ui/modal-galerija-posjeta/modal-galerija-posjeta.component';
import { ProfilZaglavljeComponent } from '../../ui/profil-zaglavlje/profil-zaglavlje.component';
import { ProfilRijeseneLokacijeComponent } from '../../ui/profil-rijesene-lokacije/profil-rijesene-lokacije.component';
import { OdabirBedzevaModalComponent } from '../../ui/odabir-bedzeva-modal/odabir-bedzeva-modal.component';
import { single } from 'rxjs';
import { UrediProfilaZahtjev } from '../../modeli/profil.model';
import { UrediProfilModalComponent } from '../../ui/uredi-profil-modal/uredi-profil-modal.component';

@Component({
  selector: 'app-profil',
  imports: [
    ProfilStatistikaComponent,
    ProfilGalerijaPosjetaComponent,
    ModalGalerijaPosjetaComponent,
    ProfilZaglavljeComponent,
    ProfilRijeseneLokacijeComponent,
    OdabirBedzevaModalComponent,
    UrediProfilModalComponent,
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit {
  private readonly profilStanje = inject(ProfilStanjeService);
  private readonly dolasciStanje = inject(DolasciLokacijeStanjeService);

  readonly profil = this.profilStanje.profil;
  readonly ucitavanje = this.profilStanje.ucitavanje;
  readonly greska = this.profilStanje.greska;

  readonly statistika = this.profilStanje.statistika;
  readonly statistikaUcitavanje = this.profilStanje.statistikaUcitavanje;
  readonly statistikaGreska = this.profilStanje.statistikaGreska;

  readonly slikePosjeta = this.profilStanje.slikePosjeta;

  readonly rijeseneLokacije = this.dolasciStanje.rijeseneLokacije;

  modalUredivanjeProfilaOtvoren = false;

  galerijaOtvorena = false;
  odabranaSlikaIndex = 0;
  modalBedzevaOtvoren = false;
  odabranaPozicijaBedza: 1 | 2 | 3 | null = null;

  mojiBedzevi = this.profilStanje.mojiBedzevi;

  ngOnInit(): void {
    this.profilStanje.ucitajMojProfil();
    this.profilStanje.ucitajMojuStatistiku();
    this.profilStanje.ucitajMojeSlikePosjeta();
    this.profilStanje.ucitajMojeBedzeve();
    this.dolasciStanje.ucitajRijeseneLokacije();
  }

  otvoriGalerijuPosjeta(index: number): void {
    this.odabranaSlikaIndex = index;
    this.galerijaOtvorena = true;
    document.body.classList.add('body--bez-scrolla');
  }

  zatvoriGalerijuPosjeta(): void {
    this.galerijaOtvorena = false;
    document.body.classList.remove('body--bez-scrolla');
  }

  otvoriMordalUredivanjeProfila(): void {
    this.modalUredivanjeProfilaOtvoren = true;
    document.body.classList.add('body--bez-scrolla');
  }

  zatvoriMordalUredivanjeProfila(): void {
    this.modalUredivanjeProfilaOtvoren = false;
    document.body.classList.remove('body--bez-scrolla');
  }

  spremiProfil(zahtjev: UrediProfilaZahtjev): void {
    this.profilStanje.urediProfil(zahtjev);
    this.zatvoriMordalUredivanjeProfila();
  }

  promijeniProfilnuSliku(event: Event): void {
    const input = event.target as HTMLInputElement;
    const datoteka = input.files?.[0];

    if (!datoteka) return;

    this.profilStanje.promijeniProfilnuSliku(datoteka);

    input.value = '';
  }

  obrisiProfilnuSliku(): void {
    const potvrda = confirm('Želite li obrisati profilnu sliku?');

    if (!potvrda) return;

    this.profilStanje.obrisiProfilnuSliku();
  }

  otvoriModalBedzeva(pozicija: 1 | 2 | 3): void {
    this.odabranaPozicijaBedza = pozicija;
    this.modalBedzevaOtvoren = true;
    this.profilStanje.ucitajMojeBedzeve();
    document.body.classList.add('body--bez-scrolla');
  }

  zatvoriModalBedzeva(): void {
    this.modalBedzevaOtvoren = false;
    this.odabranaPozicijaBedza = null;
    document.body.classList.remove('body--bez-scrolla');
  }

  postaviBedz(bedzId: number): void {
    if (!this.odabranaPozicijaBedza) return;

    this.profilStanje.postaviBedzNaProfil(this.odabranaPozicijaBedza, bedzId);
    this.zatvoriModalBedzeva();
  }
}
