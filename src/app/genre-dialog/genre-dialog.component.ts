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
export class GenreDialogComponent implements OnInit {
  genreDesc: string = ''; // {{Interpolate}} in template
  isLoading: boolean = true; // Loading message control

  constructor(
    @Inject(MAT_DIALOG_DATA) public genreName: string,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreDialogComponent>
  ) {
    console.log('genre-dialog.constructor(): Received data in dialog:', genreName);
  }

  ngOnInit(): void {
    this.getGenreDesc();
  }

  //Function will get genre description from API
  getGenreDesc(): void {
    this.fetchApiData.getGenreByName(this.genreName).subscribe((resp) => {
      this.genreDesc = resp.Description;
      this.isLoading = false; //Hide loading message is complete
      console.log(`* * Genre ${this.genreName}: ${this.genreDesc}`);
    });
  }

  //Used for cancel button functionality in template
  closeDialog(): void {
    this.dialogRef.close();
  }
}
