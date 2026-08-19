import { Observable } from 'rxjs';
import { FilterLokacija } from '../modeli/filter-lokacija.model';
import { Lokacija, SlikaLokacije } from '../modeli/lokacija.model';
import { LokacijaFormaModel } from '../../uredivanje/modeli/lokacija-forma.mode';

export abstract class LokacijeIServis {
  abstract dohvatiSveLokacije(filter?: FilterLokacija): Observable<Lokacija[]>;

  abstract dohvatiPrveTriLokacije(): Observable<Lokacija[]>;

  abstract dohvatiTrazenuLokaciju(lokacijaId: number): Observable<Lokacija>;

  abstract dodajLokaciju(zahtjev: LokacijaFormaModel): Observable<Lokacija>;

  abstract azurirajLokaciju(
    lokacijaId: number,
    zahtjev: Partial<LokacijaFormaModel>,
  ): Observable<Lokacija>;

  abstract obrisiLokaciju(lokacijaId: number): Observable<Lokacija>;

  abstract dodajSlikuLokacije(
    lokacijaId: number,
    slika: File,
    opisSlike: string,
    glavna: boolean,
  ): Observable<SlikaLokacije>;

  abstract postaviGlavnuSliku(
    lokacijaId: number,
    slikaId: number,
  ): Observable<SlikaLokacije>;

  abstract obrisiSlikuLokacije(
    lokacijaId: number,
    slikaId: number,
  ): Observable<SlikaLokacije>;
}
