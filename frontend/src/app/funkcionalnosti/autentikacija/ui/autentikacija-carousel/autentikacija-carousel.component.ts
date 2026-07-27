import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { Lokacija } from '../../../lokacije/modeli/lokacija.model';
import { PrethodniSljedeciIkonaComponent } from '../../../../dijeljeno/ui/ikone/prethodni-sljedeci-ikona/prethodni-sljedeci-ikona.component';

@Component({
  selector: 'app-autentikacija-carousel',
  imports: [PrethodniSljedeciIkonaComponent],
  templateUrl: './autentikacija-carousel.component.html',
  styleUrl: './autentikacija-carousel.component.scss',
})
export class AutentikacijaCarouselComponent implements OnInit, OnDestroy {
  lokacije = input.required<Lokacija[]>();
  apiUrl = input.required<string>();

  private timerId: ReturnType<typeof setTimeout> | null = null;

  aktivniIndex = 0;
  prethodniIndex: number | null = null;

  ngOnInit() {
    this.pokreniAutomatskuPromjenu();
  }

  ngOnDestroy(): void {
    this.zaustaviAutomatskuPromjenu();
  }

  prethodni(): void {
    const brojLokacija = this.lokacije().length;

    this.prethodniIndex = this.aktivniIndex;
    this.aktivniIndex =
      this.aktivniIndex === 0 ? brojLokacija - 1 : this.aktivniIndex - 1;

    this.pokreniAutomatskuPromjenu();
  }
  sljedeci(): void {
    const brojLokacija = this.lokacije().length;

    this.prethodniIndex = this.aktivniIndex;
    this.aktivniIndex =
      this.aktivniIndex === brojLokacija - 1 ? 0 : this.aktivniIndex + 1;

    this.pokreniAutomatskuPromjenu();
  }

  private pokreniAutomatskuPromjenu(): void {
    this.zaustaviAutomatskuPromjenu();

    this.timerId = setTimeout(() => {
      if (this.lokacije().length > 1) {
        this.sljedeci();
      }
    }, 7500);
  }

  private zaustaviAutomatskuPromjenu(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
