import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpPogreskaInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let poruka = 'Dogodila se pogreška';

      if (error.status === 0) {
        poruka = 'Pozadinski dio aplikacije nije dostupan';
      } else if (error.status === 401) {
        poruka = 'Niste prijavljeni';
      } else if (error.status === 403) {
        poruka = 'Nemate dopuštenje za ovu akciju';
      } else if (error.error?.message) {
        poruka = Array.isArray(error.error.message)
          ? error.error.message.join(', ')
          : error.error.message;
      }

      return throwError(() => ({
        status: error.status,
        message: poruka,
        originalError: error,
      }));
    }),
  );
};
