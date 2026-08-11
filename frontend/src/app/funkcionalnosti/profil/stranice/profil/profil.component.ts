import { Component, inject, OnInit } from '@angular/core';
import { ProfilStanjeService } from '../../stanje/profil-stanje.service';
import { DolasciLokacijeStanjeService } from '../../../lokacije/stanje/dolasci-lokacije-stanje.service';
import { KarticaLokacijeComponent } from '../../../lokacije/ui/kartice/kartica-lokacije/kartica-lokacije.component';

@Component({
  selector: 'app-profil',
  imports: [KarticaLokacijeComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit {
  private readonly profilStanje = inject(ProfilStanjeService);
  private readonly dolasciStanje = inject(DolasciLokacijeStanjeService);

  readonly profil = this.profilStanje.profil;
  readonly ucitavanje = this.profilStanje.ucitavanje;
  readonly greska = this.profilStanje.greska;

  readonly rijeseneLokacije = this.dolasciStanje.rijeseneLokacije;

  ngOnInit(): void {
    this.profilStanje.ucitajMojProfil();
    this.dolasciStanje.ucitajRijeseneLokacije();
  }
}
