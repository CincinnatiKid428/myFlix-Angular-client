import { Component, OnInit } from '@angular/core';
import { NgIf } from "@angular/common";
import { RouterModule } from '@angular/router';

//Angular Material imports
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

//Application components imports
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  imports: [
    NgIf,
    MatDialogModule,
    MatButtonModule,
    RouterModule, //for test routing to '/profile' path : ProfilePageComponent
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {

  localStorageUser: any | null = null; //user can be any(obj) or null, init to null
  localStorageToken: string | null = null; //token can be string or null, init to null

  //Flag to allow debug buttons for viewing/clearing localStorage on app-root component
  ENABLE_DEBUG_LOCALSTORAGE = false;

  constructor(public dialog: MatDialog) { }



  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  ngOnInit(): void {
    if (this.isBrowser()) {
      //Try to get user and token from localStorage
      let userString: string | null = localStorage.getItem('user');
      userString ? this.localStorageUser = JSON.parse(userString) : null;
      this.localStorageToken = localStorage.getItem('token');
    }
  }

  //Function opens the dialog when signup button is clicked  
  openUserRegistrationDialog(): void {
    console.log('Opening registration dialog...');
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '300px'
    });
  }

  //Function opens user login dialog when login button is clicked
  openUserLoginDialog(): void {
    console.log('Opening login dialog...');
    this.dialog.open(UserLoginFormComponent, {
      width: '300px'
    });
  }

  /////////////////////////////////////////////////////////////////
  // Debugging functions for information (will be removed later) //
  /////////////////////////////////////////////////////////////////

  //Clears local storage values
  clearLocalStorage(): void {
    console.log('Clearing local storage...');
    localStorage.clear();
    this.localStorageUser = null;
    this.localStorageToken = null;
  }

  //Gets local storage values and refreshes variables to Angular can see updates and display values after login
  refreshLocalStorageValues(): void {
    let userString = localStorage.getItem('user');
    this.localStorageUser = userString ? JSON.parse(userString) : null;
    this.localStorageToken = localStorage.getItem('token');
  }

}
