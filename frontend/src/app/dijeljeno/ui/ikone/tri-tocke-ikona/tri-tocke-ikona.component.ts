import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tri-tocke-ikona',
  imports: [],
  template: `
    <svg
      [attr.width]="velicina()"
      [attr.height]="velicina()"
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
        <circle cx="12" cy="5" r="1.6" [attr.fill]="boja()" />
        <circle cx="12" cy="12" r="1.6" [attr.fill]="boja()" />
        <circle cx="12" cy="19" r="1.6" [attr.fill]="boja()" />
      </g>
    </svg>
  `,
  styleUrl: './tri-tocke-ikona.component.scss',
})
export class TriTockeIkonaComponent {
  velicina = input(24);
  boja = input('#002019');
}
