import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FORM_FEATURE_KEY, State } from '@app/features/enter/+state/form.reducer';

export const selectFormState =
  createFeatureSelector<State>(FORM_FEATURE_KEY);

export const getFormState = createSelector(selectFormState, state => state.form);
export const getFormLoadedState = createSelector(selectFormState, state => state.isLoaded);

