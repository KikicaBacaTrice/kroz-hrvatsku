import { Component, input } from '@angular/core';

@Component({
  selector: 'app-xp-napredak',
  imports: [],
  templateUrl: './xp-napredak.component.html',
  styleUrl: './xp-napredak.component.scss',
})
export class XpNapredakComponent {
  razina = input.required<number>();
  xp = input.required<number>();
  readonly sljedecaRazina = 100;

  postotakXp(): number {
    return Math.min((this.xp() / this.sljedecaRazina) * 100, 100);
  }
}
