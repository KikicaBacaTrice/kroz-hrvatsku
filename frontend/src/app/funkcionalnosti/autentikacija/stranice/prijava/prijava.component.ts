import { Component, inject } from '@angular/core';
import {
  PrijavaFormaComponent,
  PrijavaFormaVrijednost,
} from '../../ui/prijava-forma/prijava-forma.component';
import { AuthStanjeService } from '../../stanje/auth-stanje.service';

@Component({
  selector: 'app-prijava',
  imports: [PrijavaFormaComponent],
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.scss',
})
export class PrijavaComponent {
  private readonly authSpremiste = inject(AuthStanjeService);

  porukaPogreske = '';

  naPrijavu(vrijednost: PrijavaFormaVrijednost): void {
    this.porukaPogreske = '';
    this.authSpremiste.prijava(vrijednost).subscribe({
      error: (greska) => {
        this.porukaPogreske = greska.message;
      },
    });
  }
}
