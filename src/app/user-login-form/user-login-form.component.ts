// File: src/app/user-login-form/user-login-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//Angular Materials imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog'; //Used to close the dialog on success
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar'; //Used to display notifications back to the user

//API service import
import { FetchApiDataService } from '../fetch-api-data.service';

//Auth check service import
import { AuthCheckService } from '../auth-check.service';

import { AppSettings } from '../app-settings';
const DEBUG_LOG = AppSettings.DEBUG_LOG; // controls logging

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})

/**
 * The user login form component.
 * @author P. Weaver
 */
export class UserLoginFormComponent implements OnInit {

  //Initialize input fields for userData
  @Input() userData = { Username: '', Password: '' };

  /**
   * Injects instances of parameters into the class.
   * @param fetchApiData API service instance used to call `userLogin()`
   * @param dialogRef `DialogRef` instance used to close dialog
   * @param snackBar `SnackBar` instance used to display message to user
   * @param router `Router` instance for navigation
   * @param authCheckService Auth service to be notified if login is successful
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    private authCheckService: AuthCheckService
  ) {

  }

  ngOnInit(): void {

  }

  /**
   * Closes dialog modal (cancel button `click` in template).
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  //Function is responsible for sending the form inputs to the backend
  /**
   * Sends form inputs to backend API and routes user on success, alerts user on fail.
   * @remarks 
   * On a successful login, the user will be routed to the MovieCard component and given
   * options for 'Movies', 'Profile' and 'Logout' in the nav bar.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {

      // Logic for a successful user login
      DEBUG_LOG && console.log('loginUser(): ✅', result);

      //Store user, token & favorite movies in localStorage
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      localStorage.setItem('favoriteMovies', JSON.stringify(result.user.FavoriteMovies));

      this.authCheckService.login(); //Notify app root user logged in

      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(`✅ ${result.user.Username} Login successful!`, 'OK', {
        duration: 2000,
      });

      //Navigate to the movies view since user has logged in successfully
      this.router.navigate(['/movies']);

    }, (result) => {
      //Logic for failed login
      DEBUG_LOG && console.log('loginUser(): ❌', result);
      this.snackBar.open(`❌ Login failed: Please try again`, 'OK', {
        duration: 8000,
      });
    });

  }
}
