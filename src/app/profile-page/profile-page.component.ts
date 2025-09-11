//File: src/app/profile-page/profile-page.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//Angular Materials imports
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; //Used to display notifications back to the user
import { MatGridListModule } from '@angular/material/grid-list';

//API service import
import { FetchApiDataService } from '../fetch-api-data.service';

//Custom confirmation dialog component
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

//Set to true for logging of profile page actions
const PROFILE_DEBUG_LOG = true;

@Component({
  selector: 'app-profile-page',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatGridListModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {

  //Initialize input fields for userData
  @Input() userData = { Password: '', Email: '', Birthdate: '' };

  user: any = null;
  favMoviesSet: Set<string> = new Set();

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,

  ) { }

  ngOnInit(): void {
    let userString: string = localStorage.getItem('user') || '';
    this.user = JSON.parse(userString) || null;
    this.favMoviesSet = new Set(localStorage.getItem('favoriteMovies')) || new Set();
  }

  /**
 * Function will convert standard date format into simple MM/DD/YYYY string
 * @param {string} bday - Standard date format
 * @returns {string} Date in MM/DD/YYYY format
 */
  formatUserBday(bday: string): string {
    let bdaySlice = bday.slice(0, 10);
    let dateParts = bdaySlice.split("-");

    if (dateParts.length !== 3)
      return "Invalid date";
    else
      return dateParts[1] + "/" + dateParts[2] + "/" + dateParts[0];
  }

  //Funciton handles API call to update account information
  updateAccountInfo(): void {
    PROFILE_DEBUG_LOG && console.log('* *Handle update info API call here...');
    this.fetchApiData.userUpdateAcctInfo(this.userData, this.user.Username).subscribe((result) => {

      //Logic for a successful update here
      PROFILE_DEBUG_LOG && console.log('updateAccountInfo(): ✅', result);

      //Update user in localStorage & this.user to cause re-render in template
      let userString = JSON.stringify(result);
      localStorage.setItem('user', userString);
      this.user = result;

      this.snackBar.open(`✅ ${result.Username} Account update successful!`, 'OK', {
        duration: 2000,
      });

    }, (result) => {

      //Logic for a failed update here
      PROFILE_DEBUG_LOG && console.log('updateAccountInfo(): ❌', result);
      this.snackBar.open(`❌ Account update failed: Please try again`, 'OK', {
        duration: 8000,
      });

    });
  }

  //Function handles API call to delete user account
  deleteAccount(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Account Deletion',
        message: 'Are you sure you want to delete your account? This action is irreversible.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //If user confirms, dialog result is true
      if (result === true) {
        PROFILE_DEBUG_LOG && console.log(`* * ${this.user.Username} confirmed deletion`);

        this.fetchApiData.userDeregistration().subscribe(() => {
          PROFILE_DEBUG_LOG && console.log(`* * deleteAccount(): ✅ Account ${this.user.Username} deleted successfully`);

          this.snackBar.open(`✅ Account ${this.user.Username} deleted successfully`, 'OK', {
            duration: 3000,
          });

          // Clear localStorage and route to welcome page
          localStorage.clear();
          this.router.navigate(['/welcome']);

        }, (error) => {
          PROFILE_DEBUG_LOG && console.log(`* * deleteAccount(): ❌ ${this.user.Username} Deletion failed`, error);

          this.snackBar.open(`❌ Failed to delete account ${this.user.Username}: ${error.message || 'Please try again'}`, 'OK', {
            duration: 8000,
          });
        });

      } else { //User cancels the confirm dialog and no delete occurs
        PROFILE_DEBUG_LOG && console.log(`* * 🚫 ${this.user.Username} cancelled deletion`);
      }
    });
  }



}
