import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Lokacija, SlikaLokacije } from '../modeli/lokacija.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';
import { map } from 'rxjs';
import {
  AzurirajKomentarLokacijeZahtjev,
  DodajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../modeli/komentarLokacije.model';
import { LokacijaFormaModel } from '../../uredivanje/modeli/lokacija-forma.mode';

@Injectable({
  providedIn: 'root',
})
export class LokacijeHttpService {
  private readonly http = inject(HttpClient);

  /* Lokacije */
  dohvatiSveLokacije() {
    return this.http.get<Lokacija[]>(`${API_URL}/lokacije`);
  }

  dohvatiPrveTriLokacije() {
    return this.http
      .get<Lokacija[]>(`${API_URL}/lokacije`)
      .pipe(map((lokacije) => lokacije.slice(0, 3)));
  }

  dohvatiTrazenuLokaciju(lokacijaId: number) {
    return this.http.get<Lokacija>(`${API_URL}/lokacije/${lokacijaId}`);
  }

  dodajLokaciju(zahtjev: LokacijaFormaModel) {
    return this.http.post<Lokacija>(`${API_URL}/lokacije`, zahtjev);
  }

  azurirajLokaciju(lokacijaId: number, zahtjev: Partial<LokacijaFormaModel>) {
    return this.http.patch<Lokacija>(
      `${API_URL}/lokacije/${lokacijaId}`,
      zahtjev,
    );
  }

  obrisiLokaciju(lokacijaId: number) {
    return this.http.delete<Lokacija>(`${API_URL}/lokacije/${lokacijaId}`);
  }

  /* Lokacija slike */
  dodajSlikuLokacije(
    lokacijaId: number,
    slika: File,
    opisSlike: string,
    glavna: boolean,
  ) {
    const formData = new FormData();

    formData.append('slika', slika);
    formData.append('opisSlike', opisSlike);
    formData.append('glavna', String(glavna));

    return this.http.post<SlikaLokacije>(
      `${API_URL}/lokacije/${lokacijaId}/slike/upload`,
      formData,
    );
  }

  postaviGlavnuSliku(lokacijaId: number, slikaId: number) {
    return this.http.patch<SlikaLokacije>(
      `${API_URL}/lokacije/${lokacijaId}/slike/${slikaId}`,
      { glavna: true },
    );
  }

  obrisiSlikuLokacije(lokacijaId: number, slikaId: number) {
    return this.http.delete<SlikaLokacije>(
      `${API_URL}/lokacije/${lokacijaId}/slike/${slikaId}`,
    );
  }

  /* Komentar */
  dohvatiKomentareLokacije(lokacijaId: number) {
    return this.http.get<KomentarLokacije[]>(
      `${API_URL}/povratne-informacije/${lokacijaId}`,
    );
  }

  dodajKomentarLokacije(
    lokacijaId: number,
    zahtjev: DodajKomentarLokacijeZahtjev,
  ) {
    return this.http.post<KomentarLokacije>(
      `${API_URL}/povratne-informacije/${lokacijaId}`,
      zahtjev,
    );
  }

  obrisiKomentarLokacije(lokacijaId: number, povratnaInformacijaId: number) {
    return this.http.delete<KomentarLokacije>(
      `${API_URL}/povratne-informacije/${lokacijaId}/${povratnaInformacijaId}`,
    );
  }

  urediKomentarLokacije(
    lokacijaId: number,
    povratnaInformacijaId: number,
    zahtjev: AzurirajKomentarLokacijeZahtjev,
  ) {
    return this.http.patch<KomentarLokacije>(
      `${API_URL}/povratne-informacije/${lokacijaId}/${povratnaInformacijaId}`,
      zahtjev,
    );
  }
}
