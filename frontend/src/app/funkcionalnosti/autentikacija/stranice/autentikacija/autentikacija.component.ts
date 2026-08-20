import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLinkWithHref } from '@angular/router';
import { AsyncPipe, Location } from '@angular/common';

import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { KrozHrvatskuLogoIkonaComponent } from '../../../../dijeljeno/ui/ikone/kroz-hrvatsku-logo-ikona/kroz-hrvatsku-logo-ikona.component';
import { StrelicaIkonaComponent } from '../../../../dijeljeno/ui/ikone/strelica-ikona/strelica-ikona.component';
import { AutentikacijaCarouselComponent } from '../../ui/autentikacija-carousel/autentikacija-carousel.component';
import { LokacijeIServis } from '../../../lokacije/podaci/lokacije-iservis';

@Component({
  selector: 'app-autentikacija',
  imports: [
    RouterOutlet,
    AsyncPipe,
    KrozHrvatskuLogoIkonaComponent,
    StrelicaIkonaComponent,
    AutentikacijaCarouselComponent,
    RouterLinkWithHref,
  ],
  templateUrl: './autentikacija.component.html',
  styleUrl: './autentikacija.component.scss',
})
export class AutentikacijaComponent {
  private readonly lokacijeIServis = inject(LokacijeIServis);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  readonly apiUrl = API_URL;

  lokacije$ = this.lokacijeIServis.dohvatiPrveTriLokacije();

  aktivniIndex = 0;
  prethodniIndex: number | null = null;
  brojLokacija = 0;

  idiNatrag(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }
    this.router.navigate(['/']);
  }
}
