import { CanActivateFn, Router } from '@angular/router';
import { AuthStanjeService } from '../../funkcionalnosti/autentikacija/stanje/auth-stanje.service';
import { inject } from '@angular/core';

export const gostGuard: CanActivateFn = () => {
  const authStanje = inject(AuthStanjeService);
  const router = inject(Router);

  if (authStanje.prijavljen()) {
    return router.createUrlTree(['/']);
  }

  return true;
};
