import { Observable } from 'rxjs';
import { KategorijaLokacije } from '../modeli/lokacija.model';

export abstract class KategorijeIServis {
  abstract dohvatiSveKategorije(): Observable<KategorijaLokacije[]>;
}
