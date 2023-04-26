import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.router.navigate(['enter']);
      return false;
    }

    return true;
  }
}
