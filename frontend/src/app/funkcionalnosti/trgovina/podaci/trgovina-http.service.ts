import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dekoracija } from '../modeli/dekoracija.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';

@Injectable({
  providedIn: 'root',
})
export class TrgovinaHttpService {
  private readonly http = inject(HttpClient);

  dohvatiDekoracije() {
    return this.http.get<Dekoracija[]>(`${API_URL}/dekoracije`);
  }
}
