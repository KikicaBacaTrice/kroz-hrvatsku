import { Routes } from '@angular/router';
import { adminGuard } from '../../jezgra/autentikacija/admin.guard';

export const UREDIVANJE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./stranice/uredivanje-pocetna/uredivanje-pocetna.component').then(
        (m) => m.UredivanjePocetnaComponent,
      ),
  },
  {
    path: 'lokacije',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./stranice/uredivanje-lokacije/uredivanje-lokacije.component').then(
        (m) => m.UredivanjeLokacijeComponent,
      ),
  },
  {
    path: 'lokacije/dodaj',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./stranice/dodaj-lokaciju/dodaj-lokaciju.component').then(
        (m) => m.DodajLokacijuComponent,
      ),
  },
  {
    path: 'lokacije/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./stranice/uredi-lokaciju/uredi-lokaciju.component').then(
        (m) => m.UrediLokacijuComponent,
      ),
  },
];
