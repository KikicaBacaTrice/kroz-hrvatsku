import { Observable } from 'rxjs';
import {
  Dekoracija,
  DekoracijaTrgovina,
  KorisnikDekoracija,
} from '../modeli/dekoracija.model';

export abstract class TrgovinaIServis {
  abstract dohvatiDekoracije(): Observable<Dekoracija[]>;

  abstract dohvatiDekoracijeZaTrgovinu(): Observable<DekoracijaTrgovina[]>;

  abstract dohvatiMojeDekoracije(): Observable<KorisnikDekoracija[]>;

  abstract kupiDekoraciju(dekoracijaId: number): Observable<KorisnikDekoracija>;
}
