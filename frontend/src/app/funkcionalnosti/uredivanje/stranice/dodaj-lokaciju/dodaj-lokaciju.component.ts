import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LokacijaFormaModel } from '../../modeli/lokacija-forma.mode';
import { LokacijaFormaComponent } from '../../ui/lokacija-forma/lokacija-forma.component';
import { KategorijeStanjeService } from '../../../lokacije/stanje/kategorije-stanje.service';
import { LokacijeHttpService } from '../../../lokacije/podaci/servisi/lokacije-http.service';
import { LokacijaStanjeService } from '../../../lokacije/stanje/lokacija-stanje.service';

@Component({
  selector: 'app-dodaj-lokaciju',
  imports: [LokacijaFormaComponent],
  templateUrl: './dodaj-lokaciju.component.html',
  styleUrl: './dodaj-lokaciju.component.scss',
})
export class DodajLokacijuComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly kateogrijeStanje = inject(KategorijeStanjeService);
  readonly lokacijaStanje = inject(LokacijaStanjeService);

  readonly kategorije = this.kateogrijeStanje.kategorije;

  ngOnInit(): void {
    this.kateogrijeStanje.ucitajKategorije();
  }

  dodajLokaciju(zahtjev: LokacijaFormaModel): void {
    this.lokacijaStanje.dodajLokaciju(zahtjev, (lokacija) => {
      this.router.navigate(['/uredivanje/lokacije', lokacija.lokacijaId]);
    });
  }

  odustani(): void {
    this.router.navigate(['/uredivanje/lokacije']);
  }
}
