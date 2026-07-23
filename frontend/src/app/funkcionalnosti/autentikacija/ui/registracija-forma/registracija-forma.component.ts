import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LozinkaIkonaComponent } from '../../../../dijeljeno/ui/ikone/lozinka-ikona/lozinka-ikona.component';
import { EmailIkonaComponent } from '../../../../dijeljeno/ui/ikone/email-ikona/email-ikona.component';

export type RegistracijaFromaVrijednost = {
  email: string;
  lozinka: string;
  ponovljenaLozinka: string;
};

@Component({
  selector: 'app-registracija-forma',
  imports: [
    FormsModule,
    RouterLink,
    LozinkaIkonaComponent,
    EmailIkonaComponent,
  ],
  templateUrl: './registracija-forma.component.html',
  styleUrl: './registracija-forma.component.scss',
})
export class RegistracijaFormaComponent {
  @Output() registracija = new EventEmitter<RegistracijaFromaVrijednost>();

  model: RegistracijaFromaVrijednost = {
    email: '',
    lozinka: '',
    ponovljenaLozinka: '',
  };

  posalji(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.registracija.emit(this.model);
  }
}
