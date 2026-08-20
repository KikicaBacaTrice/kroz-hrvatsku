import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthOdgovor,
  PrijavaZahtjev,
  RegistracijaZahtjev,
} from '../../modeli/auth.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { AuthIServis } from '../auth-iservis';

@Injectable()
export class AuthHttpService implements AuthIServis {
  private readonly http = inject(HttpClient);

  prijava(zahtjev: PrijavaZahtjev) {
    return this.http.post<AuthOdgovor>(`${API_URL}/auth/prijava`, zahtjev);
  }

  registracija(zahtjev: RegistracijaZahtjev) {
    return this.http.post<AuthOdgovor>(`${API_URL}/auth/registracija`, zahtjev);
  }
}
