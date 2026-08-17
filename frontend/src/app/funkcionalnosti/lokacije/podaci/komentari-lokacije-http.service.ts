import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AzurirajKomentarLokacijeZahtjev,
  DodajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../modeli/komentarLokacije.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';

@Injectable({
  providedIn: 'root',
})
export class KomentariLokacijeHttpService {
  private readonly http = inject(HttpClient);

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
