import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './jezgra/autentikacija/jwt.interceptor';
import { httpPogreskaInterceptor } from './jezgra/http/http-pogreska.interceptor';
import { LokacijeIServis } from './funkcionalnosti/lokacije/podaci/lokacije-iservis';
import { LokacijeHttpService } from './funkcionalnosti/lokacije/podaci/servisi/lokacije-http.service';
import { DolasciLokacijeIServis } from './funkcionalnosti/lokacije/podaci/dolasci-lokacije-iservis';
import { DolasciLokacijeHttpService } from './funkcionalnosti/lokacije/podaci/servisi/dolasci-lokacije-http.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideHttpClient(
      withInterceptors([jwtInterceptor, httpPogreskaInterceptor]),
    ),
    {
      provide: LokacijeIServis,
      useClass: LokacijeHttpService,
    },
    {
      provide: DolasciLokacijeIServis,
      useClass: DolasciLokacijeHttpService,
    },
  ],
};
