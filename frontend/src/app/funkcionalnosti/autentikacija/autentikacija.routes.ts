import { Routes } from '@angular/router';
import { AutentikacijaComponent } from './stranice/autentikacija/autentikacija.component';

export const AUTENTIKACIJA_ROUTES: Routes = [
  {
    path: '',
    component: AutentikacijaComponent,
    children: [
      {
        path: '',
        redirectTo: 'prijava',
        pathMatch: 'full',
      },
      {
        path: 'prijava',
        loadComponent: () =>
          import('./stranice/prijava/prijava.component').then(
            (m) => m.PrijavaComponent,
          ),
      },
      {
        path: 'registracija',
        loadComponent: () =>
          import('./stranice/registracija/registracija.component').then(
            (m) => m.RegistracijaComponent,
          ),
      },
    ],
  },
];
