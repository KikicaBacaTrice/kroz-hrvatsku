import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LozinkaIkonaComponent } from '../../../../dijeljeno/ui/ikone/lozinka-ikona/lozinka-ikona.component';
import { EmailIkonaComponent } from '../../../../dijeljeno/ui/ikone/email-ikona/email-ikona.component';
import { PrethodniSljedeciIkonaComponent } from '../../../../dijeljeno/ui/ikone/prethodni-sljedeci-ikona/prethodni-sljedeci-ikona.component';

export type RegistracijaFromaVrijednost = {
  email: string;
  lozinka: string;
  ponovljenaLozinka: string;
  ime: string;
  prezime: string;
  korisnickoIme: string;
};

@Component({
  selector: 'app-registracija-forma',
  imports: [
    FormsModule,
    RouterLink,
    LozinkaIkonaComponent,
    EmailIkonaComponent,
    PrethodniSljedeciIkonaComponent,
  ],
  templateUrl: './registracija-forma.component.html',
  styleUrl: './registracija-forma.component.scss',
})
export class RegistracijaFormaComponent {
  @Input() porukaPogreske = '';
  @Output() registracija = new EventEmitter<RegistracijaFromaVrijednost>();

  korak = 1;
  pokusaoPrviKorak = false;
  pokusaoDrugiKorak = false;

  model: RegistracijaFromaVrijednost = {
    email: '',
    lozinka: '',
    ponovljenaLozinka: '',
    ime: '',
    prezime: '',
    korisnickoIme: '',
  };

  idiNaProfil(form: NgForm): void {
    this.pokusaoPrviKorak = true;

    const emailNeispravan = form.controls['email']?.invalid;
    const lozinkaNeispravan = form.controls['lozinka']?.invalid;
    const ponovljenaLozinkaNeispravan =
      form.controls['ponovljenaLozinka']?.invalid;

    if (emailNeispravan || lozinkaNeispravan || ponovljenaLozinkaNeispravan) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.model.lozinka !== this.model.ponovljenaLozinka) {
      this.porukaPogreske = 'Lozinke se ne poklapaju';
      return;
    }

    this.porukaPogreske = '';
    this.korak = 2;
  }

  idiNatrag(): void {
    this.korak = 1;
  }

  posalji(form: NgForm): void {
    this.pokusaoDrugiKorak = true;

    const imeNeispravan = form.controls['ime']?.invalid;
    const prezimeNeispravan = form.controls['prezime']?.invalid;
    const korisnickoImeNeispravan =
      form.controls['emailkorisnickoIme']?.invalid;

    if (imeNeispravan || prezimeNeispravan || korisnickoImeNeispravan) {
      form.control.markAllAsTouched();
      return;
    }
    this.registracija.emit({ ...this.model });
    form.resetForm();
    this.korak = 1;
    this.pokusaoPrviKorak = false;
    this.pokusaoDrugiKorak = false;
  }
}
