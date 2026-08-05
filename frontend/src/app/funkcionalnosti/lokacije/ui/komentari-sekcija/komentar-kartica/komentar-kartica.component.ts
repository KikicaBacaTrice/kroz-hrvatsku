import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { OcjenaZvijezdiceComponent } from '../ocjena-zvijezdice/ocjena-zvijezdice.component';
import { KomentarLokacije } from '../../../modeli/komentarLokacije.model';
import { DatePipe } from '@angular/common';
import { TriTockeIkonaComponent } from '../../../../../dijeljeno/ui/ikone/tri-tocke-ikona/tri-tocke-ikona.component';

@Component({
  selector: 'app-komentar-kartica',
  imports: [OcjenaZvijezdiceComponent, DatePipe, TriTockeIkonaComponent],
  templateUrl: './komentar-kartica.component.html',
  styleUrl: './komentar-kartica.component.scss',
})
export class KomentarKarticaComponent {
  komentar = input.required<KomentarLokacije>();
  prijavljeniKorisnikId = input<number | null>(null);

  izbornikOtvoren = signal(false);

  @Output() obrisi = new EventEmitter<KomentarLokacije>();
  @Output() uredi = new EventEmitter<KomentarLokacije>();

  jeAutorKomentar(): boolean {
    return this.prijavljeniKorisnikId() === this.komentar().korisnikId;
  }

  promijeniIzbotnik(): void {
    this.izbornikOtvoren.update((otvoren) => !otvoren);
  }

  obrisiKomentar(): void {
    this.izbornikOtvoren.set(false);
    this.obrisi.emit(this.komentar());
  }

  urediKomentar(): void {
    this.izbornikOtvoren.set(false);
    this.uredi.emit(this.komentar());
  }
}
