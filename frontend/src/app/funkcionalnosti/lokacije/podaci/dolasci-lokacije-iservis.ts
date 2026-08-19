import { Observable } from 'rxjs';
import { RijesenaLokacija } from '../modeli/posjet-lokacija.model';

export abstract class DolasciLokacijeIServis {
  abstract dohvatiMojDolazak(lokacijaId: number): Observable<any | null>;

  abstract dohvatiRijeseneLokacije(): Observable<RijesenaLokacija[]>;

  abstract zabiljeziDolazak(
    lokacijaId: number,
    biljeska: string,
    slike: File[],
  ): Observable<any>;
}
