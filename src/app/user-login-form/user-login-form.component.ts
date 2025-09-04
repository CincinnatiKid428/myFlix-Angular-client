// File: src/app/user-login-form/user-login-form.component.ts

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

//This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

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
export class UserLoginFormComponent implements OnInit {

  //Initialize input fields for userData
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

  }

  //Used for cancel button functionality in template
  closeDialog(): void {
    this.dialogRef.close();
  }

  //Function is responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login here
      console.log('loginUser():', result);

      //Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);

      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(`✅ ${result.user.Username} Login successful!`, 'OK', {
        duration: 2000,
        //panelClass: ['snackbar-success']
      });
    }, (result) => {
      //Logic for failed login here
      this.snackBar.open(`❌ Login failed: ${result}`, 'OK', {
        duration: 8000,
        //panelClass: ['snackbar-error']
      });
    });
  }
}
