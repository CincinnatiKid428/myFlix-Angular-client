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

//Auth check service import
import { AuthCheckService } from '../auth-check.service';

//Custom confirmation dialog component
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

//Logging flag to enable/disable logging in component
const DEBUG_LOG = false;

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

/**
 * Profile page component with account details and update/delete account options.
 * @author P. Weaver
 */
export class ProfilePageComponent implements OnInit {

  //Initialize input fields for userData
  @Input() userData = { Password: '', Email: '', Birthdate: '' };

  user: any = null;

  /**
   * Injects instances of parameters into the class.
   * @param fetchApiData API service instance used to call `userUpdateAcctInfo()` or `userDeregistration()`
   * @param dialog `MatDialog` instance used for to dispaly confirmation dialog
   * @param snackBar `SnackBar` instance used to display message to user
   * @param router `Router` instance for navigation
   * @param authCheckService Auth service to be notified if account deleted (logout)
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private authCheckService: AuthCheckService

  ) { }

  /**
   * Retrieves and parses 'user' from `localStorage` if present.
   */
  ngOnInit(): void {
    let userString: string = localStorage.getItem('user') || '';
    this.user = JSON.parse(userString) || null;
  }

  /**
   * Converts standard date format into simple MM/DD/YYYY string.
   * @author ChatGPT
   * @param {string} bday - Standard date format
   * @returns {string} Date in MM/DD/YYYY format
   * @remarks ChatGPT used to generate this conversion function.
   */
  formatUserBday(bday: string): string {
    let bdaySlice = bday.slice(0, 10);
    let dateParts = bdaySlice.split("-");

    if (dateParts.length !== 3)
      return "Invalid date";
    else
      return dateParts[1] + "/" + dateParts[2] + "/" + dateParts[0];
  }

  /**
   * Calls API and updates user account information with form data.
   */
  updateAccountInfo(): void {
    DEBUG_LOG && console.log('* *Handle update info API call here...');
    this.fetchApiData.userUpdateAcctInfo(this.userData, this.user.Username).subscribe((result) => {

      //Logic for a successful update
      DEBUG_LOG && console.log('updateAccountInfo(): ✅', result);

      //Update user in localStorage & this.user to cause re-render in template
      let userString = JSON.stringify(result);
      localStorage.setItem('user', userString);
      this.user = result;

      this.snackBar.open(`✅ ${result.Username} Account update successful!`, 'OK', {
        duration: 2000,
      });

    }, (result) => {

      //Logic for a failed update
      DEBUG_LOG && console.log('updateAccountInfo(): ❌', result);
      this.snackBar.open(`❌ Account update failed: Please try again`, 'OK', {
        duration: 8000,
      });

    });
  }

  /**
   * Confirms deleteion with user and calls API to delete account.
   */
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
        DEBUG_LOG && console.log(`* * ${this.user.Username} confirmed deletion`);

        this.fetchApiData.userDeregistration().subscribe(() => {
          console.log(`* * deleteAccount(): ✅ Account ${this.user.Username} deleted successfully`);

          this.snackBar.open(`✅ Account ${this.user.Username} deleted successfully`, 'OK', {
            duration: 3000,
          });

          //Notify auth service to logout user, then route to Welcome Page
          this.authCheckService.logout();
          this.router.navigate(['/welcome']);

        }, (error) => {
          console.error(`* * deleteAccount(): ❌ ${this.user.Username} Deletion failed`, error);

          this.snackBar.open(`❌ Failed to delete account ${this.user.Username}: ${error.message || 'Please try again'}`, 'OK', {
            duration: 8000,
          });
        });

      } else { //User cancels the confirm dialog and no delete occurs
        DEBUG_LOG && console.log(`* * 🚫 ${this.user.Username} cancelled deletion`);
      }
    });
  }



}
