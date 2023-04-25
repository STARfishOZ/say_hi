import { Routes } from '@angular/router';

export const ThankYouRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./thank-you.component').then((x) => x.ThankYouComponent),
  },
];
