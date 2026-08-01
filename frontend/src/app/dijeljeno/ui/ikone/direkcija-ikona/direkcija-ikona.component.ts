import { Component, input } from '@angular/core';

@Component({
  selector: 'app-direkcija-ikona',
  imports: [],
  template: `
    <svg
      [attr.width]="velicina()"
      [attr.height]="velicina()"
      [attr.fill]="boja()"
      viewBox="0 0 24 24"
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
          d="M21.12,9.88l-7-7a3.08,3.08,0,0,0-4.24,0l-7,7a3,3,0,0,0,0,4.24l7,7a3,3,0,0,0,4.24,0l7-7A3,3,0,0,0,21.12,9.88Zm-1.41,2.83-7,7a1,1,0,0,1-1.42,0h0l-7-7a1,1,0,0,1,0-1.42l7-7a1,1,0,0,1,1.42,0l7,7A1,1,0,0,1,19.71,12.71Zm-5.5-3.42a1,1,0,0,0-1.42,1.42l.3.29H9.5a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V13h2.59l-.3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l2-2a1,1,0,0,0,0-1.42Z"
        ></path>
      </g>
    </svg>
  `,
  styleUrl: './direkcija-ikona.component.scss',
})
export class DirekcijaIkonaComponent {
  boja = input('#0d372d');
  velicina = input('24');
}
