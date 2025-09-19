//File: src/app/welcome-page/welcome-page.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

//Angular Material imports
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

//Application components imports
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

//Auth check service import
import { AuthCheckService } from '../auth-check.service'; //use for persistent login

@Component({
  selector: 'app-welcome-page',
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
/**
 * First component presented to user containing Signup/Login options.
 * @author P. Weaver
 */
export class WelcomePageComponent implements OnInit {

  localStorageUser: any | null = null;
  localStorageToken: string | null = null;
  hideButtons: boolean = true; //controls if singup/login buttons are hidden

  /**
   * Injects parameters into class.
   * @param dialog `MatDialog` instance used to open signup or login dialogs
   * @param authCheckService Auth service to be notified if persistent login is found
   * @param router `Router` instance for persistent login routing (to be implemented)
   */
  constructor(
    public dialog: MatDialog,
    private authCheckService: AuthCheckService,
    private router: Router
  ) { }

  /**
   * Determines if the current execution context is the browser.
   * @returns `True` if `typeof window` and `typeof localStorage` are not `undefined`, `False` otherwise
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   * Checks `user` and `token` in `localStorage` and handles persistent login if needed.
   */
  ngOnInit(): void {
    if (this.isBrowser()) {
      let userString: string | null = localStorage.getItem('user');
      userString ? this.localStorageUser = JSON.parse(userString) : null;
      this.localStorageToken = localStorage.getItem('token');

      //Persistent login routing here if detected
      if (!!this.localStorageToken && !!this.localStorageUser) {
        this.authCheckService.login(); //notify service user is already logged in
        this.router.navigate(['/movies']);
      }
      else
        this.hideButtons = false; //show signup/login buttons to user
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
