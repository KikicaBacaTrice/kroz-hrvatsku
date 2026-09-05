import { inject, Injectable } from '@angular/core';
import { KorisniciAdminIServis } from '../korisnici-admin-iservis';
import { HttpClient } from '@angular/common/http';
import {
  AdminKorisnik,
  azurirajNovacKorisnikaZahjtev,
} from '../../../profil/modeli/profil.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KorisniciAdminHttpService implements KorisniciAdminIServis {
  private readonly http = inject(HttpClient);

  dohvatiSveKorisnike(): Observable<AdminKorisnik[]> {
    return this.http.get<AdminKorisnik[]>(`${API_URL}/korisnici`);
  }
  azurirajNovacKorisnika(
    korisnikId: number,
    zahtjev: azurirajNovacKorisnikaZahjtev,
  ): Observable<unknown> {
    return this.http.patch(`${API_URL}/korisnici/${korisnikId}/novac`, zahtjev);
  }

  obrisiKorisnika(korisnikId: number): Observable<unknown> {
    return this.http.delete(`${API_URL}/korisnici/${korisnikId}`);
  }
}
