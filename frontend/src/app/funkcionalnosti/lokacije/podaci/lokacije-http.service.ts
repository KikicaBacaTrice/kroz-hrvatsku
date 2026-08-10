import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Lokacija, SlikaLokacije } from '../modeli/lokacija.model';
import { API_URL } from '../../../jezgra/konfiguracija/api.config';
import { map } from 'rxjs';
import {
  AzurirajKomentarLokacijeZahtjev,
  DodajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../modeli/komentarLokacije.model';
import { LokacijaFormaModel } from '../../uredivanje/modeli/lokacija-forma.mode';
import { FilterLokacija } from '../modeli/filter-lokacija.model';
import { AppComponent } from '../../../app.component';
import { RijesenaLokacija } from '../modeli/posjet-lokacija.model';

@Injectable({
  providedIn: 'root',
})
export class LokacijeHttpService {
  private readonly http = inject(HttpClient);

  /* Lokacije */
  dohvatiSveLokacije(filter?: FilterLokacija) {
    let params = new HttpParams();

    if (filter?.pretraziNaziv) {
      params = params.set('pretraziNaziv', filter.pretraziNaziv);
    }
    if (filter?.zupanija) {
      params = params.set('zupanija', filter.zupanija);
    }
    if (filter?.grad) {
      params = params.set('grad', filter.grad);
    }
    if (filter?.kategorija) {
      params = params.set('kategorija', filter.kategorija);
    }

    return this.http.get<Lokacija[]>(`${API_URL}/lokacije`, { params });
  }

  dohvatiPrveTriLokacije() {
    return this.http
      .get<Lokacija[]>(`${API_URL}/lokacije`)
      .pipe(map((lokacije) => lokacije.slice(0, 3)));
  }

  dohvatiTrazenuLokaciju(lokacijaId: number) {
    return this.http.get<Lokacija>(`${API_URL}/lokacije/${lokacijaId}`);
  }

  dodajLokaciju(zahtjev: LokacijaFormaModel) {
    return this.http.post<Lokacija>(`${API_URL}/lokacije`, zahtjev);
  }

  azurirajLokaciju(lokacijaId: number, zahtjev: Partial<LokacijaFormaModel>) {
    return this.http.patch<Lokacija>(
      `${API_URL}/lokacije/${lokacijaId}`,
      zahtjev,
    );
  }

  obrisiLokaciju(lokacijaId: number) {
    return this.http.delete<Lokacija>(`${API_URL}/lokacije/${lokacijaId}`);
  }

  /* Lokacija slike */
  dodajSlikuLokacije(
    lokacijaId: number,
    slika: File,
    opisSlike: string,
    glavna: boolean,
  ) {
    const formData = new FormData();

    formData.append('slika', slika);
    formData.append('opisSlike', opisSlike);
    formData.append('glavna', String(glavna));

    return this.http.post<SlikaLokacije>(
      `${API_URL}/lokacije/${lokacijaId}/slike/upload`,
      formData,
    );
  }

  postaviGlavnuSliku(lokacijaId: number, slikaId: number) {
    return this.http.patch<SlikaLokacije>(
      `${API_URL}/lokacije/${lokacijaId}/slike/${slikaId}`,
      { glavna: true },
    );
  }

  obrisiSlikuLokacije(lokacijaId: number, slikaId: number) {
    return this.http.delete<SlikaLokacije>(
      `${API_URL}/lokacije/${lokacijaId}/slike/${slikaId}`,
    );
  }

  /* Komentar */
  dohvatiKomentareLokacije(lokacijaId: number) {
    return this.http.get<KomentarLokacije[]>(
      `${API_URL}/povratne-informacije/${lokacijaId}`,
    );
  }

  dodajKomentarLokacije(
    lokacijaId: number,
    zahtjev: DodajKomentarLokacijeZahtjev,
  ) {
    return this.http.post<KomentarLokacije>(
      `${API_URL}/povratne-informacije/${lokacijaId}`,
      zahtjev,
    );
  }

  obrisiKomentarLokacije(lokacijaId: number, povratnaInformacijaId: number) {
    return this.http.delete<KomentarLokacije>(
      `${API_URL}/povratne-informacije/${lokacijaId}/${povratnaInformacijaId}`,
    );
  }

  urediKomentarLokacije(
    lokacijaId: number,
    povratnaInformacijaId: number,
    zahtjev: AzurirajKomentarLokacijeZahtjev,
  ) {
    return this.http.patch<KomentarLokacije>(
      `${API_URL}/povratne-informacije/${lokacijaId}/${povratnaInformacijaId}`,
      zahtjev,
    );
  }

  /* Izazovi */
  zabiljeziDolazak(lokacijaId: number, biljeska: string, slike: File[]) {
    const formData = new FormData();
    formData.append('biljeska', biljeska);
    for (const slika of slike) {
      formData.append('slike', slika);
    }

    return this.http.post(`${API_URL}/lokacije/${lokacijaId}/rijesi`, formData);
  }

  dohvatiMojDolazak(lokacijaId: number) {
    return this.http.get<RijesenaLokacija | null>(
      `${API_URL}/lokacije/${lokacijaId}/moj-dolazak`,
    );
  }
}
