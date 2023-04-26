import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (!this.sharedService.formData.value) {
      this.router.navigate(['enter']);
      return false;
    }

    return true;
  }
}
