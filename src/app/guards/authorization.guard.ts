import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, Observable, of, switchMap } from 'rxjs';

import { FormFacade } from '@app/features/enter/+state/form.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private formFacade: FormFacade,
  ) { }

  canActivate(): Observable<boolean> {
    return this.formFacade.isLoaded$.pipe(
      switchMap(() => of(true)),
      catchError(() => {
        this.router.navigate(['enter']);
        return of(false)
      })
    );
  }
}
