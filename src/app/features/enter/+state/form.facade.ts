import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { FormPartialState } from './form.reducer';
import { FormActions, FormSelectors } from './public-api';
import { FormData } from '@app/types/form.data';

@Injectable({
  providedIn: 'root'
})
export class FormFacade {
  formData$ = this.store.pipe(select(FormSelectors.getFormState));
  isLoaded$ = this.store.pipe(select(FormSelectors.getFormLoadedState));

  constructor(private store: Store<FormPartialState>) {}

  setForm(formData: FormData): void {
    this.store.dispatch(FormActions.sendForm(formData));
  }
}
