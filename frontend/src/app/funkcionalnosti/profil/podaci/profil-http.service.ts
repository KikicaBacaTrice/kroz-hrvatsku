import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MojProfil, ProfilSlikaPosjeta } from '../modeli/profil.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';
import { ProfilStatistika } from '../modeli/profil-statistika.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilHttpService {
  private readonly http = inject(HttpClient);

  dohvatiMojProfil() {
    return this.http.get<MojProfil>(`${API_URL}/profil/ja`);
  }

  dohvatiMojuStatistiku() {
    return this.http.get<ProfilStatistika>(`${API_URL}/profil/ja/statistika`);
  }

  dohvatiMojeSlikePosjeta() {
    return this.http.get<ProfilSlikaPosjeta[]>(
      `${API_URL}/profil/ja/slike-posjeta`,
    );
  }

  dohvatiMojeBedzeve() {
    return this.http.get<any[]>(`${API_URL}/dekoracije/ja/moje`);
  }

  postaviBedzNaProfil(pozicijaPrikaza: number, dekoracijaId: number) {
    return this.http.patch(`${API_URL}/dekoracije/ja/aktiviraj`, {
      dekoracijaId,
      pozicijaPrikaza,
    });
  }
}
