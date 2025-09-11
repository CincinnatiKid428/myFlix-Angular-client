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
export class MovieDetailsDialogComponent implements OnInit {

  isLoading: boolean = true;
  movieData: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public movieName: any,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<MovieDetailsDialogComponent>,
  ) {
    console.log('movie-details-dialog.constructor(): Received data in dialog:', movieName);
  }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  //Function gets details on movie by title from API
  getMovieDetails(): void {
    this.fetchApiData.getMovieByTitle(this.movieName).subscribe((resp) => {
      this.movieData = resp;
      this.movieData.Actors = this.movieData.Actors.join(', '); //Convert Actors[] to formatted string
      this.isLoading = false;
      console.log('* * Movie details:', this.movieData);
    });
  }

  //Used for cancel button functionality in template
  closeDialog(): void {
    this.dialogRef.close();
  }

}
