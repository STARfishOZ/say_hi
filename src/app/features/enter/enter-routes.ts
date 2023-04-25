import { Routes } from '@angular/router';

export const EnterFeatureRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./enter.component').then((x) => x.EnterComponent),
  },
];
