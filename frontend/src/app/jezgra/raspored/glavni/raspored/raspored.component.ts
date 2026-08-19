import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigacijaComponent } from '../../navigacija/navigacija.component';
import { PodnozjeComponent } from '../../podnozje/podnozje.component';

@Component({
  selector: 'app-raspored',
  imports: [RouterOutlet, NavigacijaComponent, PodnozjeComponent],
  templateUrl: './raspored.component.html',
  styleUrl: './raspored.component.scss',
})
export class RasporedComponent {}
