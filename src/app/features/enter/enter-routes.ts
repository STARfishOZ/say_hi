import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FormEffects } from '@app/features/enter/+state/form.effects';
import * as formReducer from '@app/features/enter/+state/form.reducer';

export const EnterFeatureRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./enter.component').then((x) => x.EnterComponent),
    providers: [
      provideState(formReducer.FORM_FEATURE_KEY, formReducer.formReducer),
      provideEffects(FormEffects)
    ],
  },
];
