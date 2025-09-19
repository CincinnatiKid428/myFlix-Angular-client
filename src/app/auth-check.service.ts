//File: src/app/auth-check.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AppSettings } from './app-settings';
const DEBUG_LOG = AppSettings.DEBUG_LOG; // controls logging

@Injectable({
  providedIn: 'root'
})

/**
 * Provides an authentication check service through an `Observable` that other components can subscribe to.
 * @remarks Components can use this service for auth status info or to update status after UI-based login/logout.
 * @author ChatGPT generated base, modified by P. Weaver
 */
export class AuthCheckService {

  /**
   * User authentication state
   */
  private loggedIn = new BehaviorSubject<boolean>(false);

  /**
   * Observable that components can subscribe to in order to check if user is authenticated
   * @readonly
   */
  readonly isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    //NO browser access here — do not call hasAuth() here or this will cause errors with server-side rendering (SSR)
  }

  /**
   * Checks authentication status and updates Observable isLoggedIn.
   * 
   * @remarks 
   * This method should be called in `AppComponent.ngOnInit()` after the platform is stable.
   * It ensures that localStorage is only accessed in a browser environment, avoiding errors during server-side rendering (SSR).
   */
  init(): void {
    if (this.isBrowser()) {
      const hasAuth = this.hasAuth();
      this.loggedIn.next(hasAuth);
      DEBUG_LOG && console.log(`🔐 AuthCheckService.init(): ${hasAuth ? '✅ Auth found' : '❌ Not authenticated'}`);
    }
  }


  /**
   * Checks whether authentication data is present in localStorage.
   * 
   * @returns `true` if `user` && `token` are within localStorage; `false` otherwise.
   */
  private hasAuth(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token'); // Logic provided by ChatGPT
  }

  /**
   * Determines if current execution context is a browser environment.
   * 
   * @returns `true` if `window` and `localStorage` are defined; otherwise, `false`.
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';  // Logic provided by ChatGPT
  }

  /**
   * Updates 'Observable' loggedIn to 'true'.
   * @remarks Subscribers to `loggedIn$` will be notified when value updates to `true` after user logs in.
   */
  login(): void {
    this.loggedIn.next(true);
    DEBUG_LOG && console.log(`**AuthCheckService: ✅ Logged in!`);
  }

  /**
   * Updates 'Observable' loggedIn to 'false' and clear localStorage.
   * @remarks Subscribers to `loggedIn$` will be notified when value updates to `false` after user is logged out.
   */
  logout(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
    this.loggedIn.next(false);
    DEBUG_LOG && console.log(`**AuthCheckService: ❌ Logged out!`);
  }
}
