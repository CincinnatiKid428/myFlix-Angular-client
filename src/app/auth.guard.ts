//File: src/app/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

//This class will implement the 
// 
/**
 * Implements `CanActivate` function which checks a condition and 
 * allows a user to navigate to a specific route in `src/app/app.routes.ts`
 * @author ChatGPT generated utility class
 */
export class AuthGuard implements CanActivate {

  /**
   * Injects `Router` instance into class.
   * @param router Used for navigation in `canActivate()`
   */
  constructor(private router: Router) { }

  /**
   * Checks `localStorage` for `user` & `token` to be set for navigation access.
   * @returns `true` if user has authenticated, `false` otherwise
   * @remarks
   * If the user has authenticated, they will have access to routes `/profile` and
   * `/movies`, otherwise they well be routed back to `/welcome` for registration or login.
   */
  canActivate(): boolean {
    //user and token will be defined in localStorage if user has logged in
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
