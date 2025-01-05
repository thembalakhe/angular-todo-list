import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  private auth = getAuth();

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = this.auth.currentUser;
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
