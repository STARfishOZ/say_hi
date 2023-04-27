import { createAction, props } from '@ngrx/store';

import { FormData } from '@app/types/form.data';

export const sendForm = createAction(
  '[Form] Send Form',
  props<FormData>()
);
export const isLoaded = createAction(
  '[Form] Form Loaded');
