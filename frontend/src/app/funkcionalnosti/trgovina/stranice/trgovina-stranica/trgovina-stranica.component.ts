import { Component, inject, OnInit } from '@angular/core';
import { TrgovinaStanjeService } from '../../stanje/trgovina-stanje.service';
import { KarticaDekoracijeComponent } from '../../ui/kartica-dekoracije/kartica-dekoracije.component';

@Component({
  selector: 'app-trgovina-stranica',
  imports: [KarticaDekoracijeComponent],
  templateUrl: './trgovina-stranica.component.html',
  styleUrl: './trgovina-stranica.component.scss',
})
export class TrgovinaStranicaComponent implements OnInit {
  private readonly trgovinaStanje = inject(TrgovinaStanjeService);

  readonly dekoracijePoTipu = this.trgovinaStanje.dekoracijePoTipu;
  readonly ucitavanje = this.trgovinaStanje.ucitavanje;
  readonly greska = this.trgovinaStanje.greska;

  ngOnInit(): void {
    this.trgovinaStanje.ucitajDekoracije();
  }
}
