import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';

import { FormActions } from './public-api';

@Injectable()
export class FormEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

  sendForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.sendForm),
      map(() => FormActions.isLoaded()),
      tap(() => this.router.navigate(['thankyou']))
    )
  );
}
