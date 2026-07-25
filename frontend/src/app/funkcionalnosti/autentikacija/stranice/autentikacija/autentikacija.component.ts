import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AsyncPipe, Location } from '@angular/common';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { PrethodniSljedeciIkonaComponent } from '../../../../dijeljeno/ui/ikone/prethodni-sljedeci-ikona/prethodni-sljedeci-ikona.component';
import { KrozHrvatskuLogoIkonaComponent } from '../../../../dijeljeno/ui/ikone/kroz-hrvatsku-logo-ikona/kroz-hrvatsku-logo-ikona.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StrelicaIkonaComponent } from '../../../../dijeljeno/ui/ikone/strelica-ikona/strelica-ikona.component';

@Component({
  selector: 'app-autentikacija',
  imports: [
    RouterOutlet,
    AsyncPipe,
    PrethodniSljedeciIkonaComponent,
    KrozHrvatskuLogoIkonaComponent,
    StrelicaIkonaComponent,
  ],
  templateUrl: './autentikacija.component.html',
  styleUrl: './autentikacija.component.scss',
})
export class AutentikacijaComponent {
  private readonly lokacijeHttp = inject(LokacijeHttpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  private timerId: ReturnType<typeof setTimeout> | null = null;

  readonly apiUrl = API_URL;

  lokacije$ = this.lokacijeHttp.dohvatiPrveTriLokacije();

  aktivniIndex = 0;
  prethodniIndex: number | null = null;
  brojLokacija = 0;

  constructor() {
    this.lokacije$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lokacije) => {
        this.brojLokacija = lokacije.length;

        if (this.brojLokacija > 1) {
          this.pokreniAutomatskuPromjenu();
        }
      });
  }

  idiNatrag(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.zaustaviAutomatskuPromjenu();
  }

  prethodni(brojLokacija: number): void {
    this.prethodniIndex = this.aktivniIndex;

    this.aktivniIndex =
      this.aktivniIndex === 0 ? brojLokacija - 1 : this.aktivniIndex - 1;

    this.pokreniAutomatskuPromjenu();
  }
  sljedeci(brojLokacija: number): void {
    this.prethodniIndex = this.aktivniIndex;

    this.aktivniIndex =
      this.aktivniIndex === brojLokacija - 1 ? 0 : this.aktivniIndex + 1;

    this.pokreniAutomatskuPromjenu();
  }

  private pokreniAutomatskuPromjenu(): void {
    this.zaustaviAutomatskuPromjenu();

    this.timerId = setTimeout(() => {
      if (this.brojLokacija > 1) {
        this.sljedeci(this.brojLokacija);
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
