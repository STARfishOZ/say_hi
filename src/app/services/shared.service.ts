import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { FormData } from '../types/form.data';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  formData = new BehaviorSubject<FormData | null>(null)
}
