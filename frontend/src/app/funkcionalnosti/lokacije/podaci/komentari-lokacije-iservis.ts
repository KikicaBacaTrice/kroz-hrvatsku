import { Observable } from 'rxjs';
import {
  AzurirajKomentarLokacijeZahtjev,
  DodajKomentarLokacijeZahtjev,
  KomentarLokacije,
} from '../modeli/komentarLokacije.model';

export abstract class KomentariLokacijeIServis {
  abstract dohvatiKomentareLokacije(
    lokacijaId: number,
  ): Observable<KomentarLokacije[]>;

  abstract dodajKomentarLokacije(
    lokacijaId: number,
    zahtjev: DodajKomentarLokacijeZahtjev,
  ): Observable<KomentarLokacije>;

  abstract obrisiKomentarLokacije(
    lokacijaId: number,
    povratnaInformacijaId: number,
  ): Observable<KomentarLokacije>;

  abstract urediKomentarLokacije(
    lokacijaId: number,
    povratnaInformacijaId: number,
    zahtjev: AzurirajKomentarLokacijeZahtjev,
  ): Observable<KomentarLokacije>;
}
