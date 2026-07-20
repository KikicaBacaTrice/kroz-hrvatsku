import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenSpremisteService } from './token-spremiste.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenSpremiste = inject(TokenSpremisteService);
  const token = tokenSpremiste.dohvatiToken();

  if (!token) {
    return next(req);
  }

  const zahtjevSTokenom = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(zahtjevSTokenom);
};
