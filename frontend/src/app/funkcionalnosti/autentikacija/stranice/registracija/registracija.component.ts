import { Component, inject } from '@angular/core';
import {
  RegistracijaFormaComponent,
  RegistracijaFromaVrijednost,
} from '../../ui/registracija-forma/registracija-forma.component';
import { AuthStanjeService } from '../../stanje/auth-stanje.service';

@Component({
  selector: 'app-registracija',
  imports: [RegistracijaFormaComponent],
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.scss',
})
export class RegistracijaComponent {
  private readonly authStanje = inject(AuthStanjeService);
  porukaPogreske = '';

  naRegistraciju(vrijednost: RegistracijaFromaVrijednost) {
    this.porukaPogreske = '';

    const zahtjev = {
      ime: vrijednost.ime,
      prezime: vrijednost.prezime,
      korisnickoIme: vrijednost.korisnickoIme,
      email: vrijednost.email,
      lozinka: vrijednost.lozinka,
    };

    this.authStanje.registracija(zahtjev).subscribe({
      error: (greska) => {
        this.porukaPogreske = greska.message;
      },
    });
  }
}
