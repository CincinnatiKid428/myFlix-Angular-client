//File: src/app/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

//This class will implement the CanActivate function which checks 
// a condition and allows a user to navigate to a specific route in src/app/app.routes.ts
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      return true;
    } else {
      this.router.navigate(['/welcome']);
      return false;
    }
  }
}
