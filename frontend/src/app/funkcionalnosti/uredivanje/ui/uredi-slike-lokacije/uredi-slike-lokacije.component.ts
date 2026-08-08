import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import { Lokacija } from '../../../lokacije/modeli/lokacija.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uredi-slike-lokacije',
  imports: [FormsModule],
  templateUrl: './uredi-slike-lokacije.component.html',
  styleUrl: './uredi-slike-lokacije.component.scss',
})
export class UrediSlikeLokacijeComponent {
  private readonly lokacijeHttp = inject(LokacijeHttpService);

  lokacija = input.required<Lokacija>();

  @Output() slikePromijenjene = new EventEmitter<void>();

  apiUrl = API_URL;

  odabranaSlika: File | null = null;
  opisSlike = '';
  slikaJeGlavna = false;

  odaberiSliku(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.odabranaSlika = input.files?.[0] ?? null;
  }

  dodajSliku(event: Event): void {
    event.preventDefault();

    if (!this.odabranaSlika) {
      return;
    }

    this.lokacijeHttp
      .dodajSlikuLokacije(
        this.lokacija().lokacijaId,
        this.odabranaSlika,
        this.opisSlike,
        this.slikaJeGlavna,
      )
      .subscribe({
        next: () => {
          this.odabranaSlika = null;
          this.opisSlike = '';
          this.slikaJeGlavna = false;

          this.slikePromijenjene.emit();
        },
      });
  }

  postaviKaoGlavnu(slikaId: number): void {
    this.lokacijeHttp
      .postaviGlavnuSliku(this.lokacija().lokacijaId, slikaId)
      .subscribe({
        next: () => {
          this.slikePromijenjene.emit();
        },
      });
  }

  obrisiSliku(slikaId: number): void {
    const potvrdeno = confirm('Jeste li sigurni da želite obrisati ovu sliku?');

    if (!potvrdeno) {
      return;
    }

    this.lokacijeHttp
      .obrisiSlikuLokacije(this.lokacija().lokacijaId, slikaId)
      .subscribe({
        next: () => {
          this.slikePromijenjene.emit();
        },
      });
  }

  sortiraneSlike() {
    return [...this.lokacija().slikeLokacije].sort((a, b) => {
      if (a.glavna !== b.glavna) {
        return a.glavna ? -1 : 1;
      }

      return a.slikaId - b.slikaId;
    });
  }
}
