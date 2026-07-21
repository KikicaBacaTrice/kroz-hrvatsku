import { Component } from '@angular/core';
import {
  RegistracijaFormaComponent,
  RegistracijaFromaVrijednost,
} from '../../ui/registracija-forma/registracija-forma.component';

@Component({
  selector: 'app-registracija',
  imports: [RegistracijaFormaComponent],
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.scss',
})
export class RegistracijaComponent {
  naRegistraciju(vrijednost: RegistracijaFromaVrijednost) {
    console.log(vrijednost);
  }
}
