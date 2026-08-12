import { Component, computed, input } from '@angular/core';
import { NovacIkonaComponent } from '../../../../dijeljeno/ui/ikone/novac-ikona/novac-ikona.component';

@Component({
  selector: 'app-profil-statistika',
  imports: [NovacIkonaComponent],
  templateUrl: './profil-statistika.component.html',
  styleUrl: './profil-statistika.component.scss',
})
export class ProfilStatistikaComponent {
  xp = input.required<number>();
  brojIzazova = input.required<number>();
  brojPostignuca = input.required<number>();
  brojFotografija = input.required<number>();
  brojNovcica = input.required<number>();

  postotakXp = computed(() => {
    return Math.min((this.xp() / 100) * 100, 100);
  });
}
