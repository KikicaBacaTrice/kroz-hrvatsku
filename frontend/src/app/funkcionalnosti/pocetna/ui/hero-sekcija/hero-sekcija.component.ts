import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-sekcija',
  imports: [],
  templateUrl: './hero-sekcija.component.html',
  styleUrl: './hero-sekcija.component.scss',
})
export class HeroSekcijaComponent {
  jePrijavljen = input.required();
}
