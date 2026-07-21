import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

export type PrijavaFormaVrijednost = {
  email: string;
  lozinka: string;
};

@Component({
  selector: 'app-prijava-forma',
  imports: [FormsModule, RouterLink],
  templateUrl: './prijava-forma.component.html',
  styleUrl: './prijava-forma.component.scss',
})
export class PrijavaFormaComponent {
  @Output() prijava = new EventEmitter<PrijavaFormaVrijednost>();

  model: PrijavaFormaVrijednost = {
    email: '',
    lozinka: '',
  };

  posalji(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.prijava.emit(this.model);
  }
}
