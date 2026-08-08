import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { KategorijaLokacije } from '../modeli/lokacija.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';

@Injectable({
  providedIn: 'root',
})
export class KategorijeHttpService {
  private readonly http = inject(HttpClient);

  dohvatiSveKategorije() {
    return this.http.get<KategorijaLokacije[]>(`${API_URL}/kategorije`);
  }
}
