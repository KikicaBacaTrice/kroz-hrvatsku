import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { KategorijaLokacije } from '../../modeli/lokacija.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { KategorijeIServis } from '../kateogrije-iservis';

@Injectable()
export class KategorijeHttpService implements KategorijeIServis {
  private readonly http = inject(HttpClient);

  dohvatiSveKategorije() {
    return this.http.get<KategorijaLokacije[]>(`${API_URL}/kategorije`);
  }
}
