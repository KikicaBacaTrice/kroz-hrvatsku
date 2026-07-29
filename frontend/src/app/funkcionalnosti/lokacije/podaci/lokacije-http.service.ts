import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Lokacija } from '../modeli/lokacija.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LokacijeHttpService {
  private readonly http = inject(HttpClient);

  dohvatiPrveTriLokacije() {
    return this.http
      .get<Lokacija[]>(`${API_URL}/lokacije`)
      .pipe(map((lokacije) => lokacije.slice(0, 3)));
  }

  dohvatiTrazenuLokaciju(lokacijaId: number) {
    return this.http.get<Lokacija>(`${API_URL}/lokacije/${lokacijaId}`);
  }
}
