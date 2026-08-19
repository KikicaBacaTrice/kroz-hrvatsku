import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  MojProfil,
  ProfilSlikaPosjeta,
  UrediProfilaZahtjev,
} from '../../modeli/profil.model';
import { API_URL } from '../../../../jezgra/konfiguracija/api.config';
import { ProfilStatistika } from '../../modeli/profil-statistika.model';
import { ProfilIServis } from '../profil-iservis';

@Injectable()
export class ProfilHttpService implements ProfilIServis {
  private readonly http = inject(HttpClient);

  dohvatiMojProfil() {
    return this.http.get<MojProfil>(`${API_URL}/profil/ja`);
  }

  urediMojProfil(zahtjev: UrediProfilaZahtjev) {
    return this.http.patch<MojProfil>(`${API_URL}/profil/ja`, zahtjev);
  }

  promijeniProfilnuSliku(slika: File) {
    const formData = new FormData();
    formData.append('slika', slika);

    return this.http.patch<MojProfil>(`${API_URL}/profil/ja/slika`, formData);
  }

  obrisiProfilnuSliku() {
    return this.http.delete<MojProfil>(`${API_URL}/profil/ja/slika`);
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

  aktivirajDekoraciju(dekoracijaId: number, pozicijaPrikaza: number) {
    return this.http.patch(`${API_URL}/dekoracije/ja/aktiviraj`, {
      dekoracijaId,
      pozicijaPrikaza,
    });
  }

  deaktivirajTipDekoracije(tipDekoracijeId: number) {
    return this.http.patch(`${API_URL}/dekoracije/ja/deaktiviraj-tip`, {
      tipDekoracijeId,
    });
  }
}
