// File: src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Angular Materials imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog'; //Used to close the dialog on success
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar'; //Used to display notifications back to the user

//This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

import { AppSettings } from '../app-settings';
const DEBUG_LOG = AppSettings.DEBUG_LOG; // controls logging

@Component({
  selector: 'app-user-registration-form',
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
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/**
 * The user registration form component.
 * @author P. Weaver
 */
export class UserRegistrationFormComponent implements OnInit {

  //Initialize input fields for userData
  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };

  /**
   * Injects instances of parameters into the class.
   * @param fetchApiData API service instance used to call `userRegistration()`
   * @param dialogRef `DialogRef` instance used to close dialog
   * @param snackBar `SnackBar` instance used to display message to user
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  /**
   * Closes dialog modal (cancel button `click` in template).
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Sends registration form inputs to backend and alerts user of sucess/fail via SnackBar.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      DEBUG_LOG && console.log('registerUser():', result);
      //Logic for a successful user registration 
      this.dialogRef.close();
      this.snackBar.open(`✅ Registered ${result.Username} successfully!`, 'OK', {
        duration: 2500,

      });
    }, (result) => {
      //Logic for failed registration
      this.snackBar.open(`❌ Registration failed: ${result}`, 'OK', {
        duration: 8000,

      });
    });
  }

}