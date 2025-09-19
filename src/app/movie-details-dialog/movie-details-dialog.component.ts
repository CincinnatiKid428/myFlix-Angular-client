//File: src/app/movie-details-dialog/movie-details-dialog.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { NgIf } from '@angular/common';

//Angular Material imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';

//API service import
import { FetchApiDataService } from '../fetch-api-data.service';

//Logging flag to enable/disable logging in component
const DEBUG_LOG = false;

@Component({
  selector: 'app-movie-details-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinner,
    MatGridListModule,
    NgIf,
  ],
  templateUrl: './movie-details-dialog.component.html',
  styleUrl: './movie-details-dialog.component.scss'
})

/**
 * Movie details dialog component that displays information about a specific movie.
 * @author P. Weaver
 */
export class MovieDetailsDialogComponent implements OnInit {

  isLoading: boolean = true; //used to show/hide spinner in template
  movieData: any = null;

  /**
   * Injects params and `MAT_DIALOG_DATA` into class.
   * @param movieName The name of the movie to fetch details about
   * @param fetchApiData API service instance used to call `getMovieByTitle()`
   * @param dialogRef `DialogRef` instance used to close movie details dialog
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public movieName: any,
    private fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<MovieDetailsDialogComponent>,
  ) {
    DEBUG_LOG && console.log('movie-details-dialog.constructor(): Received data in dialog:', movieName);
  }

  /**
   * Calls this.getMovieDetails() to prep data to be rendered.
   */
  ngOnInit(): void {
    this.getMovieDetails();
  }

  /**
   * Closes dialog modal (cancel button `click` in template).
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Fetches movie information via API call.
   */
  getMovieDetails(): void {
    this.fetchApiData.getMovieByTitle(this.movieName).subscribe((resp) => {
      this.movieData = resp;
      //Convert Actors[] to formatted string
      this.movieData.Actors = this.movieData.Actors.join(', ');
      //Done loading, hide spinner 
      this.isLoading = false;
      DEBUG_LOG && console.log('* * Movie details:', this.movieData);
    });
  }

}
