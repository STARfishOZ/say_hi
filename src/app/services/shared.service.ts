import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormDataInterface } from '../types/form-data.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public formData = new BehaviorSubject<FormDataInterface | undefined>(undefined)
}
