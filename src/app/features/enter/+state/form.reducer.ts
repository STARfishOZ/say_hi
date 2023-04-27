import { Action, createReducer, on } from '@ngrx/store';

import { FormData } from '@app/types/form.data';
import { FormActions } from './public-api';

export const FORM_FEATURE_KEY = 'form';

export interface State {
  form: FormData | null;
  isLoaded: boolean;
}

export interface FormPartialState {
  readonly [FORM_FEATURE_KEY]: State;
}

export const initialFormState: State = {
  form: null,
  isLoaded: false
};

const reducer = createReducer(
  initialFormState,
  on(FormActions.sendForm, (state, form) => ({
    ...state,
    form,
  })),
  on(FormActions.isLoaded, (state) => ({
    ...state,
    isLoaded: true
  })),
);

export function formReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}

