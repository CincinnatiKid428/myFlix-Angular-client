//File: src/app/auth-check.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  // Observable you can subscribe to in components to check if user is authenticated
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    //NO browser access here — leave empty
  }

  /**
   * Call this in AppComponent.ngOnInit() — after platform is stable
   */
  init(): void {
    if (this.isBrowser()) {
      const hasAuth = this.hasAuth();
      this.loggedIn.next(hasAuth);
      console.log(`🔐 AuthCheckService.init(): ${hasAuth ? '✅ Auth found' : '❌ Not authenticated'}`);
    }
  }

  // Utility: checks localStorage
  private hasAuth(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }

  //Function determines if we are in the browser yet
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  //Function updates loggedIn = true
  login(): void {
    this.loggedIn.next(true);
    console.log(`**AuthCheckService: ✅ Logged in!`);
  }

  //Function clears localStorage and updates loggedIn = false
  logout(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
    this.loggedIn.next(false);
    console.log(`**AuthCheckService: ❌ Logged out!`);
  }
}
