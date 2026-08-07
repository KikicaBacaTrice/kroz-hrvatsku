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
];
