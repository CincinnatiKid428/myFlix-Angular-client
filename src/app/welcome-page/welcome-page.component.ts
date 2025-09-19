//File: src/app/welcome-page/welcome-page.component.ts

import { Component, OnInit } from '@angular/core';

//Angular Material imports
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

//Application components imports
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
/**
 * First component presented to user containing Signup/Login options.
 * @author P. Weaver
 */
export class WelcomePageComponent implements OnInit {

  localStorageUser: any | null = null; //user can be any(obj) or null, init to null
  localStorageToken: string | null = null; //token can be string or null, init to null

  constructor(public dialog: MatDialog) { }

  /**
   * Determines if the current execution context is the browser.
   * @returns `True` if `typeof window` and `typeof localStorage` are not `undefined`, `False` otherwise
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   * Tries to get `user` and `token` from `localStorage`.
   */
  ngOnInit(): void {
    if (this.isBrowser()) {
      let userString: string | null = localStorage.getItem('user');
      userString ? this.localStorageUser = JSON.parse(userString) : null;
      this.localStorageToken = localStorage.getItem('token');
    }
  }

  /**
   * Opens the `UserRegistrationFormComponent` dialog when 'Signup' button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '50%',
    });
  }

  /**
   * Opens `UserLoginFormComponent` dialog when 'Login' button is clicked.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '50%'
    });
  }

}
