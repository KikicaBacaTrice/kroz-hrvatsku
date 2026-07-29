import { Routes } from '@angular/router';
import { RasporedComponent } from './jezgra/raspored/glavni/raspored/raspored.component';
import { authGuard } from './jezgra/autentikacija/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: RasporedComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./funkcionalnosti/pocetna/stranice/pocetna/pocetna.component').then(
            (m) => m.PocetnaComponent,
          ),
      },
      {
        path: 'lokacije',
        loadComponent: () =>
          import('./funkcionalnosti/lokacije/stranice/lista-lokacija/lista-lokacija.component').then(
            (m) => m.ListaLokacijaComponent,
          ),
      },
      {
        path: 'lokacije/:id',
        loadComponent: () =>
          import('./funkcionalnosti/lokacije/stranice/detalji-lokacije/detalji-lokacije.component').then(
            (m) => m.DetaljiLokacijeComponent,
          ),
      },
      {
        path: 'profil',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./funkcionalnosti/profil/stranice/profil/profil.component').then(
            (m) => m.ProfilComponent,
          ),
      },
    ],
  },
  {
    path: 'autentikacija',
    loadChildren: () =>
      import('./funkcionalnosti/autentikacija/autentikacija.routes').then(
        (m) => m.AUTENTIKACIJA_ROUTES,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
