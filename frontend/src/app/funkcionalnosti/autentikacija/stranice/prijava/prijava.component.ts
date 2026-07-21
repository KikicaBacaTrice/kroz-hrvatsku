import { Component } from '@angular/core';
import {
  PrijavaFormaComponent,
  PrijavaFormaVrijednost,
} from '../../ui/prijava-forma/prijava-forma.component';

@Component({
  selector: 'app-prijava',
  imports: [PrijavaFormaComponent],
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.scss',
})
export class PrijavaComponent {
  naPrijavu(vrijednost: PrijavaFormaVrijednost): void {
    console.log(vrijednost);
  }
}
