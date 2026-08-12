import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  signal,
} from '@angular/core';
import { ProfilSlikaPosjeta } from '../../modeli/profil.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { ZatovriIkonaComponent } from '../../../../dijeljeno/ui/ikone/zatovri-ikona/zatovri-ikona.component';
import { PrethodniSljedeciIkonaComponent } from '../../../../dijeljeno/ui/ikone/prethodni-sljedeci-ikona/prethodni-sljedeci-ikona.component';

@Component({
  selector: 'app-modal-galerija-posjeta',
  imports: [ZatovriIkonaComponent, PrethodniSljedeciIkonaComponent],
  templateUrl: './modal-galerija-posjeta.component.html',
  styleUrl: './modal-galerija-posjeta.component.scss',
})
export class ModalGalerijaPosjetaComponent {
  slike = input.required<ProfilSlikaPosjeta[]>();
  pocetniIndex = input(0);

  @Output() zatvori = new EventEmitter<void>();

  readonly apiUrl = API_URL;
  readonly aktivniIndex = signal(0);

  aktivnaSlika = computed(() => {
    return this.slike()[this.aktivniIndex()];
  });

  ngOnInit(): void {
    this.aktivniIndex.set(this.pocetniIndex());
  }

  prethodna(): void {
    this.aktivniIndex.update((index) =>
      index === 0 ? this.slike().length - 1 : index - 1,
    );
  }

  sljedeca(): void {
    this.aktivniIndex.update((index) =>
      index === this.slike().length - 1 ? 0 : index + 1,
    );
  }
}
