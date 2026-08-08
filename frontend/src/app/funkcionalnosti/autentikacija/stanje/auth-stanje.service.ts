import { inject, Injectable, signal } from '@angular/core';
import { AuthHttpService } from '../podaci/auth-http.service';
import { TokenSpremisteService } from '../../../jezgra/autentikacija/token-spremiste.service';
import { Router } from '@angular/router';
import { PrijavaZahtjev, RegistracijaZahtjev } from '../modeli/auth.model';
import { tap } from 'rxjs';
import { ProfilStanjeService } from '../../profil/stanje/profil-stanje.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStanjeService {
  private readonly authHttp = inject(AuthHttpService);
  private readonly tokenSpremiste = inject(TokenSpremisteService);
  private readonly router = inject(Router);
  private readonly profilStanje = inject(ProfilStanjeService);

  readonly prijavljen = signal(this.tokenSpremiste.jePrijavljen());

  prijava(zahtjev: PrijavaZahtjev) {
    return this.authHttp.prijava(zahtjev).pipe(
      tap((odgovor) => {
        this.tokenSpremiste.spremiToken(odgovor.accessToken);
        this.prijavljen.set(true);
        this.router.navigate(['/']);
      }),
    );
  }

  registracija(zahtjev: RegistracijaZahtjev) {
    return this.authHttp.registracija(zahtjev).pipe(
      tap((odgovor) => {
        this.tokenSpremiste.spremiToken(odgovor.accessToken);
        this.prijavljen.set(true);
        this.profilStanje.ucitajMojProfil();
        this.router.navigate(['/']);
      }),
    );
  }

  odjava(): void {
    this.tokenSpremiste.obrisiToken();
    this.prijavljen.set(false);
    this.profilStanje.ocistiProfil();
    this.router.navigate(['/autentikacija/prijava']);
  }
}
