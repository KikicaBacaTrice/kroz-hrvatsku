import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStanjeService } from '../../../funkcionalnosti/autentikacija/stanje/auth-stanje.service';
import { TokenSpremisteService } from '../../autentikacija/token-spremiste.service';

@Component({
  selector: 'app-navigacija',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigacija.component.html',
  styleUrl: './navigacija.component.scss',
})
export class NavigacijaComponent {
  readonly authStanje = inject(AuthStanjeService);
  readonly tokenSpremiste = inject(TokenSpremisteService);

  odjava(): void {
    this.authStanje.odjava();
  }
}
