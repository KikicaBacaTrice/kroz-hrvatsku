import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStanjeService } from '../../../funkcionalnosti/autentikacija/stanje/auth-stanje.service';
import { KrozHrvatskuLogoIkonaComponent } from '../../../dijeljeno/ui/ikone/kroz-hrvatsku-logo-ikona/kroz-hrvatsku-logo-ikona.component';
import { ProfilStanjeService } from '../../../funkcionalnosti/profil/stanje/profil-stanje.service';
import { NovacIkonaComponent } from '../../../dijeljeno/ui/ikone/novac-ikona/novac-ikona.component';
import { ProfilIkonaComponent } from '../../../dijeljeno/ui/ikone/profil-ikona/profil-ikona.component';
import { XpNapredakComponent } from '../../../dijeljeno/ui/xp-napredak/xp-napredak.component';

@Component({
  selector: 'app-navigacija',
  imports: [
    RouterLink,
    RouterLinkActive,
    KrozHrvatskuLogoIkonaComponent,
    NovacIkonaComponent,
    XpNapredakComponent,
  ],
  templateUrl: './navigacija.component.html',
  styleUrl: './navigacija.component.scss',
})
export class NavigacijaComponent {
  readonly authStanje = inject(AuthStanjeService);
  readonly profilStanje = inject(ProfilStanjeService);

  izbornikOtvoren = signal(false);

  promijeniStanjeIzbornika(): void {
    this.izbornikOtvoren.update((otvoren) => !otvoren);
  }

  zatvoriIzbornik(): void {
    this.izbornikOtvoren.set(false);
  }

  ngOnInit(): void {
    if (this.authStanje.prijavljen()) {
      this.profilStanje.ucitajMojProfil();
    }
  }

  odjava(): void {
    this.zatvoriIzbornik();
    this.authStanje.odjava();
  }
}
