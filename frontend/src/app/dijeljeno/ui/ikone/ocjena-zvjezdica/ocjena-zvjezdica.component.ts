import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-ocjena-zvjezdica',
  imports: [],
  template: `
    <svg
      class="ocjena-zvjezdica"
      viewBox="0 0 24 24"
      [attr.width]="velicina()"
      [attr.height]="velicina()"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          [attr.id]="napraviIdZvjezdice()"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" [attr.stop-color]="bojaIspune()" />
          <stop
            [attr.offset]="ispunaPostotak()"
            [attr.stop-color]="bojaIspune()"
          />
          <stop
            [attr.offset]="ispunaPostotak()"
            [attr.stop-color]="bojaPrazna()"
          />
          <stop offset="100%" [attr.stop-color]="bojaPrazna()" />
        </linearGradient>
      </defs>

      <path
        [attr.fill]="'url(#' + napraviIdZvjezdice() + ')'"
        [attr.stroke]="bojaRuba()"
        stroke-width="1.8"
        stroke-linejoin="round"
        d="M12 2.5l2.92 5.92 6.53.95-4.73 4.61 1.12 6.5L12 17.41l-5.84 3.07 1.12-6.5-4.73-4.61 6.53-.95L12 2.5z"
      />
    </svg>
  `,
  styles: `
    :host {
      display: inline-grid;
      line-height: 0;
    }

    .ocjena-zvjezdica {
      display: block;
    }
  `,
})
export class OcjenaZvjezdicaComponent {
  ispuna = input.required<number>();
  velicina = input(24);
  bojaIspune = input('var(--clr-sekundarna-400)');
  bojaPrazna = input('transparent');
  bojaRuba = input('var(--clr-sekundarna-400)');

  napraviIdZvjezdice = computed(() => {
    return `zvjezdica-${Math.random().toString(36).slice(2)}`;
  });

  ispunaPostotak = computed(() => {
    const vrijednost = Math.max(0, Math.min(this.ispuna(), 100));
    return `${vrijednost}%`;
  });
}
