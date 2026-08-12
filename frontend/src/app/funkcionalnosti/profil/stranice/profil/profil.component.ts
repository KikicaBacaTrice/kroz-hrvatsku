import { Component, inject, OnInit } from '@angular/core';
import { ProfilStanjeService } from '../../stanje/profil-stanje.service';
import { DolasciLokacijeStanjeService } from '../../../lokacije/stanje/dolasci-lokacije-stanje.service';
import { ProfilStatistikaComponent } from '../../ui/profil-statistika/profil-statistika.component';
import { ProfilGalerijaPosjetaComponent } from '../../ui/profil-galerija-posjeta/profil-galerija-posjeta.component';
import { ModalGalerijaPosjetaComponent } from '../../ui/modal-galerija-posjeta/modal-galerija-posjeta.component';
import { ProfilZaglavljeComponent } from '../../ui/profil-zaglavlje/profil-zaglavlje.component';
import { ProfilRijeseneLokacijeComponent } from '../../ui/profil-rijesene-lokacije/profil-rijesene-lokacije.component';

@Component({
  selector: 'app-profil',
  imports: [
    ProfilStatistikaComponent,
    ProfilGalerijaPosjetaComponent,
    ModalGalerijaPosjetaComponent,
    ProfilZaglavljeComponent,
    ProfilRijeseneLokacijeComponent,
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

  galerijaOtvorena = false;
  odabranaSlikaIndex = 0;

  ngOnInit(): void {
    this.profilStanje.ucitajMojProfil();
    this.profilStanje.ucitajMojuStatistiku();
    this.profilStanje.ucitajMojeSlikePosjeta();
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
}
