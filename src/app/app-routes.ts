import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { AuthGuard } from '@app/guards/authorization.guard';

export const routes: Routes = [
  {
    path: 'enter',
    loadChildren: () => import('./features/enter/enter-routes').then((x) => x.EnterFeatureRoutes),
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./features/thank-you/thank-you-routes').then((x) => x.ThankYouRoutes),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { path: '', redirectTo: 'enter', pathMatch: 'full' }
];
