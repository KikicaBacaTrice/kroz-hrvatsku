import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStanjeService } from '../../../funkcionalnosti/autentikacija/stanje/auth-stanje.service';
import { KrozHrvatskuLogoIkonaComponent } from '../../../dijeljeno/ui/ikone/kroz-hrvatsku-logo-ikona/kroz-hrvatsku-logo-ikona.component';
import { ProfilStanjeService } from '../../../funkcionalnosti/profil/stanje/profil-stanje.service';
import { NovacIkonaComponent } from '../../../dijeljeno/ui/ikone/novac-ikona/novac-ikona.component';
import { ProfilIkonaComponent } from '../../../dijeljeno/ui/ikone/profil-ikona/profil-ikona.component';
import { XpNapredakComponent } from '../../../dijeljeno/ui/xp-napredak/xp-napredak.component';
import { HamburgerIkonaComponent } from '../../../dijeljeno/ui/ikone/hamburger-ikona/hamburger-ikona.component';
import { ZatovriIkonaComponent } from '../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';
import { DOCUMENT } from '@angular/common';
import { MobilniIzbornikComponent } from './ui/mobilni-izbornik/mobilni-izbornik.component';

@Component({
  selector: 'app-navigacija',
  imports: [
    RouterLink,
    RouterLinkActive,
    KrozHrvatskuLogoIkonaComponent,
    NovacIkonaComponent,
    XpNapredakComponent,
    HamburgerIkonaComponent,
    MobilniIzbornikComponent,
  ],
  templateUrl: './navigacija.component.html',
  styleUrl: './navigacija.component.scss',
})
export class NavigacijaComponent implements OnInit {
  readonly authStanje = inject(AuthStanjeService);
  readonly profilStanje = inject(ProfilStanjeService);
  private readonly document = inject(DOCUMENT);

  izbornikOtvoren = signal(false);
  mobilniIzbornikOtvoren = signal(false);

  ngOnInit(): void {
    if (this.authStanje.prijavljen()) {
      this.profilStanje.ucitajMojProfil();
    }
  }

  promijeniStanjeIzbornika(): void {
    this.izbornikOtvoren.update((otvoren) => !otvoren);
  }

  zatvoriIzbornik(): void {
    this.izbornikOtvoren.set(false);
  }

  otovriMobilniIzbornik(): void {
    this.mobilniIzbornikOtvoren.set(true);
    this.document.body.classList.add('body--bez-scrolla');
  }

  zatovriMobilniIzbornik(): void {
    this.mobilniIzbornikOtvoren.set(false);
    this.document.body.classList.remove('body--bez-scrolla');
  }

  odjava(): void {
    this.zatvoriIzbornik();
    this.zatovriMobilniIzbornik();
    this.authStanje.odjava();
  }
}
