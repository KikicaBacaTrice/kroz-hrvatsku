import { Routes } from '@angular/router';

export const UREDIVANJE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./stranice/uredivanje-pocetna/uredivanje-pocetna.component').then(
        (m) => m.UredivanjePocetnaComponent,
      ),
  },
  {
    path: 'lokacije',
    loadComponent: () =>
      import('./stranice/uredivanje-lokacije/uredivanje-lokacije.component').then(
        (m) => m.UredivanjeLokacijeComponent,
      ),
  },
  {
    path: 'lokacije/dodaj',
    loadComponent: () =>
      import('./stranice/dodaj-lokaciju/dodaj-lokaciju.component').then(
        (m) => m.DodajLokacijuComponent,
      ),
  },
  {
    path: 'lokacije/:id',
    loadComponent: () =>
      import('./stranice/uredi-lokaciju/uredi-lokaciju.component').then(
        (m) => m.UrediLokacijuComponent,
      ),
  },
];
