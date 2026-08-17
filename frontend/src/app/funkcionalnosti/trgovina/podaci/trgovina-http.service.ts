import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Dekoracija,
  DekoracijaTrgovina,
  KorisnikDekoracija,
} from '../modeli/dekoracija.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';

@Injectable({
  providedIn: 'root',
})
export class TrgovinaHttpService {
  private readonly http = inject(HttpClient);

  dohvatiDekoracije() {
    return this.http.get<Dekoracija[]>(`${API_URL}/dekoracije`);
  }

  dohvatiDekoracijeZaTrgovinu() {
    return this.http.get<DekoracijaTrgovina[]>(
      `${API_URL}/dekoracije/ja/trgovina`,
    );
  }

  dohvatiMojeDekoracije() {
    return this.http.get<KorisnikDekoracija[]>(`${API_URL}/dekoracije/ja/moje`);
  }

  kupiDekoraciju(dekoracijaId: number) {
    return this.http.post<KorisnikDekoracija>(
      `${API_URL}/dekoracije/ja/kupi/${dekoracijaId}`,
      {},
    );
  }
}
