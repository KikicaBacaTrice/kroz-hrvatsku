import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';
import { RijesenaLokacija } from '../modeli/posjet-lokacija.model';

@Injectable({
  providedIn: 'root',
})
export class DolasciLokacijeHttpService {
  private readonly http = inject(HttpClient);

  zabiljeziDolazak(lokacijaId: number, biljeska: string, slike: File[]) {
    const formData = new FormData();
    formData.append('biljeska', biljeska);
    for (const slika of slike) {
      formData.append('slike', slika);
    }

    return this.http.post<RijesenaLokacija>(
      `${API_URL}/lokacije/${lokacijaId}/rijesi`,
      formData,
    );
  }

  dohvatiMojDolazak(lokacijaId: number) {
    return this.http.get<RijesenaLokacija | null>(
      `${API_URL}/lokacije/${lokacijaId}/moj-dolazak`,
    );
  }
}
