//File: src/app/genre-dialog/genre-dialog.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { NgIf } from '@angular/common';

//Angular Material imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

//API service import
import { FetchApiDataService } from '../fetch-api-data.service';

import { AppSettings } from '../app-settings';
const DEBUG_LOG = AppSettings.DEBUG_LOG; // controls logging

@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinner,
    NgIf,
  ],
  templateUrl: './genre-dialog.component.html',
  styleUrl: './genre-dialog.component.scss'
})

/**
 * Genre information dialog component.
 * @author P. Weaver
 */
export class GenreDialogComponent implements OnInit {
  genreDesc: string = ''; // {{Interpolate}} in template
  isLoading: boolean = true; // Loading message control

  /**
   * Injects params and `MAT_DIALOG_DATA` into class.
   * @param genreName Name of the genre to fetch details about
   * @param fetchApiData API service instance used to call `getGenreByName()`
   * @param dialogRef `DialogRef` instance used to close genre dialog
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public genreName: string,
    private fetchApiData: FetchApiDataService,
    private dialogRef: MatDialogRef<GenreDialogComponent>
  ) {
    DEBUG_LOG && console.log('genre-dialog.constructor(): Received data in dialog:', genreName);
  }

  /**
   * Calls `this.getGenreDesc()` to prep data for rendering.
   */
  ngOnInit(): void {
    this.getGenreDesc();
  }

  /**
   * Closes dialog modal (cancel button `click` in template).
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Fetches genre information via API call.
   */
  getGenreDesc(): void {
    this.fetchApiData.getGenreByName(this.genreName).subscribe((resp) => {
      this.genreDesc = resp.Description;
      this.isLoading = false; //Hide loading message is complete
      DEBUG_LOG && console.log(`* * Genre ${this.genreName}: ${this.genreDesc}`);
    });
  }

}
