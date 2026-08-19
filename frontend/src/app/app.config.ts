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
import { KategorijeIServis } from './funkcionalnosti/lokacije/podaci/kateogrije-iservis';
import { KategorijeHttpService } from './funkcionalnosti/lokacije/podaci/servisi/kategorije-http.service';
import { KomentariLokacijeIServis } from './funkcionalnosti/lokacije/podaci/komentari-lokacije-iservis';
import { KomentariLokacijeHttpService } from './funkcionalnosti/lokacije/podaci/servisi/komentari-lokacije-http.service';
import { AuthHttpService } from './funkcionalnosti/autentikacija/podaci/servis/auth-http.service';
import { AuthIServis } from './funkcionalnosti/autentikacija/podaci/auth-iservis';
import { ProfilIServis } from './funkcionalnosti/profil/podaci/profil-iservis';
import { ProfilHttpService } from './funkcionalnosti/profil/podaci/servis/profil-http.service';
import { TrgovinaIServis } from './funkcionalnosti/trgovina/podaci/trgovina-iservis';
import { TrgovinaHttpService } from './funkcionalnosti/trgovina/podaci/servis/trgovina-http.service';

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
    {
      provide: KategorijeIServis,
      useClass: KategorijeHttpService,
    },
    {
      provide: KomentariLokacijeIServis,
      useClass: KomentariLokacijeHttpService,
    },
    {
      provide: AuthIServis,
      useClass: AuthHttpService,
    },
    {
      provide: ProfilIServis,
      useClass: ProfilHttpService,
    },
    {
      provide: TrgovinaIServis,
      useClass: TrgovinaHttpService,
    },
  ],
};
