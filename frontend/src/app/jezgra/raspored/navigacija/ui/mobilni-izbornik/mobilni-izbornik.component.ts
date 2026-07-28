import { Component, EventEmitter, input, Output, output } from '@angular/core';
import { ZatovriIkonaComponent } from '../../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';
import { MojProfil } from '../../../../../funkcionalnosti/profil/modeli/profil.model';
import { XpNapredakComponent } from '../../../../../dijeljeno/ui/xp-napredak/xp-napredak.component';
import { NovacIkonaComponent } from '../../../../../dijeljeno/ui/ikone/novac-ikona/novac-ikona.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobilni-izbornik',
  imports: [
    ZatovriIkonaComponent,
    XpNapredakComponent,
    NovacIkonaComponent,
    RouterLink,
  ],
  templateUrl: './mobilni-izbornik.component.html',
  styleUrl: './mobilni-izbornik.component.scss',
})
export class MobilniIzbornikComponent {
  otvoren = input(false);
  prijavljen = input(false);
  profil = input<MojProfil | null>(null);

  @Output() zatvori = new EventEmitter<void>();
  @Output() odjava = new EventEmitter<void>();

  zatovriIzbornik(): void {
    this.zatvori.emit();
  }

  odjavaKorisnik(): void {
    this.odjava.emit();
  }
}
