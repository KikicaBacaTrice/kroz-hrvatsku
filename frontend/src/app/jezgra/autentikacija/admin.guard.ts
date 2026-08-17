import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStanjeService } from '../../funkcionalnosti/autentikacija/stanje/auth-stanje.service';
import { ProfilStanjeService } from '../../funkcionalnosti/profil/stanje/profil-stanje.service';

export const adminGuard: CanActivateFn = () => {
  const authStanje = inject(AuthStanjeService);
  const profilStanje = inject(ProfilStanjeService);
  const router = inject(Router);

  if (!authStanje.prijavljen()) {
    return router.createUrlTree(['/autentikacija/prijava']);
  }

  const profil = profilStanje.profil();

  if (profil?.korisnik.ulogaId === 2) {
    return true;
  }

  return router.createUrlTree(['/']);
};
