import { Component, input } from '@angular/core';

@Component({
  selector: 'app-strelica-ikona',
  imports: [],
  template: `
    <svg
      [attr.width]="velicina()"
      [attr.height]="velicina()"
      [style.transform]="'rotate(' + rotacija() + 'deg)'"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6 12H18M6 12L11 7M6 12L11 17"
          [attr.stroke]="boja()"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  `,
  styles: ``,
})
export class StrelicaIkonaComponent {
  boja = input('#002019');
  velicina = input(24);
  rotacija = input(0);
}
