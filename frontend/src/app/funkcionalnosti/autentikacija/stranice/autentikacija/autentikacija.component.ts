import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { PrethodniSljedeciIkonaComponent } from '../../../../dijeljeno/ui/ikone/prethodni-sljedeci-ikona/prethodni-sljedeci-ikona.component';

@Component({
  selector: 'app-autentikacija',
  imports: [RouterOutlet, AsyncPipe, PrethodniSljedeciIkonaComponent],
  templateUrl: './autentikacija.component.html',
  styleUrl: './autentikacija.component.scss',
})
export class AutentikacijaComponent {
  private readonly lokacijeHttp = inject(LokacijeHttpService);
  readonly apiUrl = API_URL;

  lokacije$ = this.lokacijeHttp.dohvatiPrveTriLokacije();

  aktivniIndex = 0;
  prethodniIndex: number | null = null;

  prethodni(brojLokacija: number): void {
    this.aktivniIndex =
      this.aktivniIndex === 0 ? brojLokacija - 1 : this.aktivniIndex - 1;
  }
  sljedeci(brojLokacija: number): void {
    this.prethodniIndex = this.aktivniIndex;

    this.aktivniIndex =
      this.aktivniIndex === brojLokacija - 1 ? 0 : this.aktivniIndex + 1;
  }
}
