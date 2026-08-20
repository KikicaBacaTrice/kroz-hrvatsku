import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-sekcija',
  imports: [RouterLink],
  templateUrl: './hero-sekcija.component.html',
  styleUrl: './hero-sekcija.component.scss',
})
export class HeroSekcijaComponent {
  jePrijavljen = input.required();
}
