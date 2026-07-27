import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MojProfil } from '../modeli/profil.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';

@Injectable({
  providedIn: 'root',
})
export class ProfilHttpService {
  private readonly http = inject(HttpClient);

  dohvatiMojProfil() {
    return this.http.get<MojProfil>(`${API_URL}/profil/ja`);
  }
}
