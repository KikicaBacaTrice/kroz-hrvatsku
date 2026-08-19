import { Routes } from '@angular/router';
import { AutentikacijaComponent } from './stranice/autentikacija/autentikacija.component';
import { gostGuard } from '../../jezgra/autentikacija/gost.guard';

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
        canActivate: [gostGuard],
        loadComponent: () =>
          import('./stranice/prijava/prijava.component').then(
            (m) => m.PrijavaComponent,
          ),
      },
      {
        path: 'registracija',
        canActivate: [gostGuard],
        loadComponent: () =>
          import('./stranice/registracija/registracija.component').then(
            (m) => m.RegistracijaComponent,
          ),
      },
    ],
  },
];
