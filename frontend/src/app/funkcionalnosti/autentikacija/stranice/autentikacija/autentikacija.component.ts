import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLinkWithHref } from '@angular/router';
import { AsyncPipe, Location } from '@angular/common';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { KrozHrvatskuLogoIkonaComponent } from '../../../../dijeljeno/ui/ikone/kroz-hrvatsku-logo-ikona/kroz-hrvatsku-logo-ikona.component';
import { StrelicaIkonaComponent } from '../../../../dijeljeno/ui/ikone/strelica-ikona/strelica-ikona.component';
import { AutentikacijaCarouselComponent } from '../../ui/autentikacija-carousel/autentikacija-carousel.component';

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
  private readonly lokacijeHttp = inject(LokacijeHttpService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  readonly apiUrl = API_URL;

  lokacije$ = this.lokacijeHttp.dohvatiPrveTriLokacije();

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
