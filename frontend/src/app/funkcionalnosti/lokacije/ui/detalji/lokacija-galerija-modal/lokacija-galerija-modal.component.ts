import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { SlikaLokacije } from '../../../modeli/lokacija.model';
import { PrethodniSljedeciIkonaComponent } from '../../../../../dijeljeno/ui/ikone/prethodni-sljedeci-ikona/prethodni-sljedeci-ikona.component';
import { ZatovriIkonaComponent } from '../../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';

@Component({
  selector: 'app-lokacija-galerija-modal',
  imports: [PrethodniSljedeciIkonaComponent, ZatovriIkonaComponent],
  templateUrl: './lokacija-galerija-modal.component.html',
  styleUrl: './lokacija-galerija-modal.component.scss',
})
export class LokacijaGalerijaModalComponent implements OnInit {
  slike = input.required<SlikaLokacije[]>();
  pocetniIndex = input(0);
  apiUrl = input.required<string>();

  @Output() zatvori = new EventEmitter<void>();

  aktivniIndex = 0;

  ngOnInit(): void {
    this.aktivniIndex = this.pocetniIndex();
  }

  prethodnaSlika(): void {
    const brojSlika = this.slike().length;
    this.aktivniIndex =
      this.aktivniIndex === 0 ? brojSlika - 1 : this.aktivniIndex - 1;
  }
  sljedecaSlika(): void {
    const brojSlika = this.slike().length;
    this.aktivniIndex =
      this.aktivniIndex === brojSlika - 1 ? 0 : this.aktivniIndex + 1;
  }

  postaviAktivnuSliku(index: number): void {
    this.aktivniIndex = index;
  }

  zatvoriModal(): void {
    this.zatvori.emit();
  }
}
