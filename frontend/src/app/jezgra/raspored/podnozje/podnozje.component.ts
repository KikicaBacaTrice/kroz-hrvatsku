import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KrozHrvatskuLogoIkonaComponent } from '../../../dijeljeno/ui/ikone/kroz-hrvatsku-logo-ikona/kroz-hrvatsku-logo-ikona.component';
import { AuthStanjeService } from '../../../funkcionalnosti/autentikacija/stanje/auth-stanje.service';

@Component({
  selector: 'app-podnozje',
  imports: [RouterModule, KrozHrvatskuLogoIkonaComponent],
  templateUrl: './podnozje.component.html',
  styleUrl: './podnozje.component.scss',
})
export class PodnozjeComponent {
  readonly authStanje = inject(AuthStanjeService);
}
