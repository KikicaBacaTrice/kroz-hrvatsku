import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Lokacija } from '../modeli/lokacija.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';
import { map } from 'rxjs';
import {
  AzurirajKomentarLokacijeZahtjev,
  DodajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../modeli/komentarLokacije.model';

@Injectable({
  providedIn: 'root',
})
export class LokacijeHttpService {
  private readonly http = inject(HttpClient);

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
