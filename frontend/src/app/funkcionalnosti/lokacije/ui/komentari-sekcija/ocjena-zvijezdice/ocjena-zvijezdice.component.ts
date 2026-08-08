import { Component, computed, input, Input } from '@angular/core';
import { OcjenaZvjezdicaComponent } from '../../../../../dijeljeno/ui/ikone/ocjena-zvjezdica/ocjena-zvjezdica.component';

@Component({
  selector: 'app-ocjena-zvijezdice',
  imports: [OcjenaZvjezdicaComponent],
  templateUrl: './ocjena-zvijezdice.component.html',
  styleUrl: './ocjena-zvijezdice.component.scss',
})
export class OcjenaZvijezdiceComponent {
  ocjena = input.required<number>();
  velicina = input(24);

  zvjezdice = computed(() => {
    const ocjena = Math.max(0, Math.min(this.ocjena(), 5));

    return Array.from({ length: 5 }, (_, index) => {
      const vrijednostZvjezdice = ocjena - index;

      if (vrijednostZvjezdice >= 1) return 100;
      if (vrijednostZvjezdice <= 0) return 0;

      return vrijednostZvjezdice * 100;
    });
  });
}
