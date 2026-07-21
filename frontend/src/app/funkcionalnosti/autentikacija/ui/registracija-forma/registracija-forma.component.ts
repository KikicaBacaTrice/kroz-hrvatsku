import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

export type RegistracijaFromaVrijednost = {
  email: string;
  lozinka: string;
};

@Component({
  selector: 'app-registracija-forma',
  imports: [FormsModule, RouterLink],
  templateUrl: './registracija-forma.component.html',
  styleUrl: './registracija-forma.component.scss',
})
export class RegistracijaFormaComponent {
  @Output() registracija = new EventEmitter<RegistracijaFromaVrijednost>();

  model: RegistracijaFromaVrijednost = {
    email: '',
    lozinka: '',
  };

  posalji(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.registracija.emit(this.model);
  }
}
