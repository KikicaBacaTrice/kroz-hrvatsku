import { Observable } from 'rxjs';
import {
  AdminKorisnik,
  azurirajNovacKorisnikaZahjtev,
} from '../../profil/modeli/profil.model';

export abstract class KorisniciAdminIServis {
  abstract dohvatiSveKorisnike(): Observable<AdminKorisnik[]>;

  abstract azurirajNovacKorisnika(
    korisnikId: number,
    zahtjev: azurirajNovacKorisnikaZahjtev,
  ): Observable<unknown>;

  abstract obrisiKorisnika(korisnikId: number): Observable<unknown>;
}
