import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenSpremisteService } from './token-spremiste.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenSpremiste = inject(TokenSpremisteService);
  const router = inject(Router);

  if (tokenSpremiste.jePrijavljen()) {
    return true;
  }

  return router.createUrlTree(['/autentikacija']);
};
