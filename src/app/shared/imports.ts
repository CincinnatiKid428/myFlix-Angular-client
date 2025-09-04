// File: src/app/shared/imports.ts

// Contains imports for Angular Material, HTTP, browser, forms and browser animations modules that
//   will be exported and used in other components as a shared import 

import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
//import { NgModule } from '@angular/core'; //Not needed here

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//import {AppRoutingModule } from './app-routing.module'; //Doesn't exist? Not needed with standalone model
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//We will import this file into the following components instead:
//import { AppComponent } from '../app.component'; 
//import {UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';


export const SHARED_IMPORTS = [
  BrowserModule,
  HttpClient,
  // AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSnackBarModule
];