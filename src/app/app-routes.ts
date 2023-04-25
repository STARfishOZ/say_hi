import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'enter',
    loadChildren: () => import('./features/enter/enter-routes').then((x) => x.EnterFeatureRoutes)
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./features/thank-you/thank-you-routes').then((x) => x.ThankYouRoutes)
  },
  { path: '', redirectTo: '/enter', pathMatch: 'full' }
];
