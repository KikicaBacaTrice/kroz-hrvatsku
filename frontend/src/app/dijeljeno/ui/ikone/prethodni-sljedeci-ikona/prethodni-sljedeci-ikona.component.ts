import { Component, input } from '@angular/core';

@Component({
  selector: 'app-prethodni-sljedeci-ikona',
  imports: [],
  template: `
    <svg
      [attr.width]="velicina()"
      [attr.height]="velicina()"
      [style.transform]="'rotate(' + rotacija() + 'deg'"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6L15 12L9 18"
        [attr.stroke]="boja()"
        [attr.stroke-width]="debljinaLinije()"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  `,
  styles: ``,
})
export class PrethodniSljedeciIkonaComponent {
  velicina = input(24);
  boja = input('currentColor');
  rotacija = input(0);
  debljinaLinije = input(2);
}
