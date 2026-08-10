import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ZatovriIkonaComponent } from '../../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';

export type ZabiljeziDolazakPodaci = {
  biljeska: string;
  slike: File[];
};

@Component({
  selector: 'app-zabiljeni-dolazak-modal',
  imports: [ZatovriIkonaComponent, FormsModule],
  templateUrl: './zabiljeni-dolazak-modal.component.html',
  styleUrl: './zabiljeni-dolazak-modal.component.scss',
})
export class ZabiljeniDolazakModalComponent {
  spremanje = input(false);

  @Output() zatvori = new EventEmitter<void>();
  @Output() spremi = new EventEmitter<ZabiljeziDolazakPodaci>();

  model: ZabiljeziDolazakPodaci = {
    biljeska: '',
    slike: [],
  };

  odaberiSlike(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.model.slike = Array.from(input.files ?? []);
  }

  ukloniSliku(index: number) {
    this.model.slike = this.model.slike.filter(
      (_, trenutniIndex) => trenutniIndex !== index,
    );
  }

  posalji(forma: NgForm): void {
    if (forma.invalid) {
      forma.control.markAllAsTouched();
      return;
    }

    this.spremi.emit(this.model);
  }
}
