import { Observable } from 'rxjs';
import {
  MojProfil,
  ProfilSlikaPosjeta,
  UrediProfilaZahtjev,
} from '../modeli/profil.model';
import { ProfilStatistika } from '../modeli/profil-statistika.model';

export abstract class ProfilIServis {
  abstract dohvatiMojProfil(): Observable<MojProfil>;

  abstract urediMojProfil(zahtjev: UrediProfilaZahtjev): Observable<MojProfil>;

  abstract promijeniProfilnuSliku(slika: File): Observable<MojProfil>;

  abstract obrisiProfilnuSliku(): Observable<MojProfil>;

  abstract dohvatiMojuStatistiku(): Observable<ProfilStatistika>;

  abstract dohvatiMojeSlikePosjeta(): Observable<ProfilSlikaPosjeta[]>;

  abstract dohvatiMojeBedzeve(): Observable<any[]>;

  abstract postaviBedzNaProfil(
    pozicijaPrikaza: number,
    dekoracijaId: number,
  ): Observable<unknown>;

  abstract aktivirajDekoraciju(
    dekoracijaId: number,
    pozicijaPrikaza: number,
  ): Observable<unknown>;

  abstract deaktivirajTipDekoracije(
    tipDekoracijeId: number,
  ): Observable<unknown>;
}
