import { Routes } from '@angular/router';
import { RasporedComponent } from './jezgra/raspored/glavni/raspored/raspored.component';
import { DetaljiLokacijeComponent } from './funkcionalnosti/lokacije/stranice/detalji-lokacije/detalji-lokacije.component';

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
        loadComponent: () =>
          import('./funkcionalnosti/profil/stranice/profil/profil.component').then(
            (m) => m.ProfilComponent,
          ),
      },
    ],
  },
  {
    path: 'autentikacija',
    loadComponent: () =>
      import('./funkcionalnosti/autentikacija/stranice/autentikacija/autentikacija.component').then(
        (m) => m.AutentikacijaComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
