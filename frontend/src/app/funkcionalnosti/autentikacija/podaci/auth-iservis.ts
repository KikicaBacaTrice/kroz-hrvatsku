import { Observable } from 'rxjs';
import {
  AuthOdgovor,
  PrijavaZahtjev,
  RegistracijaZahtjev,
} from '../modeli/auth.model';

export abstract class AuthIServis {
  abstract prijava(zahtjev: PrijavaZahtjev): Observable<AuthOdgovor>;

  abstract registracija(zahtjev: RegistracijaZahtjev): Observable<AuthOdgovor>;
}
