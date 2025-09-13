// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; //Used for favorite toggle button
import { MatButtonToggleModule } from '@angular/material/button-toggle'; //Used for movie filter

import { FormsModule } from '@angular/forms'; //To use [(NgModel)] for filter
import { NgFor } from '@angular/common';

import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    NgFor,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent implements OnInit {
  //allMovies: any[] = [];
  movies: any[] = []; //Will hold array of all movies
  favMoviesSet: Set<string> = new Set(); //Initialize to empty Set
  selectedFilter: 'all' | 'favorites' | 'non-favorites' = 'all';  //Will be used to select movie list filter

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserFavoriteMovies();
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  get filteredMovies(): any[] {
    return this.movies.filter((movie) => {
      const isFav = this.isFavorite(movie._id);
      switch (this.selectedFilter) {
        case 'favorites':
          return isFav;
        case 'non-favorites':
          return !isFav;
        default:
          return true; // 'all'
      }
    });
  }

  //Opens director information dialog
  openDirectorDialog(movieTitle: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: movieTitle,
      width: '80%'
    });
  }

  //Opens genre information dialog
  openGenreDialog(genreName: string): void {
    console.log(`Getting genre description...`)
    this.dialog.open(GenreDialogComponent, {
      data: genreName,
      width: '80%'
    });
  }

  //Opens movie details dialog
  openMovieDetailsDialog(movieData: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: movieData,
      width: '80%'
    });
  }

  getUserFavoriteMovies(): void {
    let user: string = localStorage.getItem('user') || '';
    let parsedUser: any = JSON.parse(user);
    this.favMoviesSet = new Set(parsedUser.FavoriteMovies);
    console.log(`* * ${parsedUser.Username} FavoriteMovies:`, this.favMoviesSet);
  }

  //Handles toggling fav movieId if API call returns successfully & updates localStorage
  toggleFavMovie(movieId: string): void {

    if (this.favMoviesSet.has(movieId)) {
      //Call API remove and if successful update set
      this.fetchApiData.userDeleteFavMovie(movieId).subscribe((resp) => {
        console.log(`* * Response from deleting ${movieId}:`, resp);
        //Update the Set favMoviesSet
        this.favMoviesSet.delete(movieId);
      });

    } else {
      //Call API add and if successful update set
      this.fetchApiData.userAddFavMovie(movieId).subscribe((resp) => {
        console.log(`* * Response from adding ${movieId}:`, resp);
        //Update the Set favMoviesSet
        this.favMoviesSet.add(movieId);
      });
    }
    //Update localStorage with new favorites (will set to same list if add/delete fails)
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favMoviesSet));
  }

  //Function returns if movieId is a member of this.favMoviesSet
  isFavorite(movieId: any): boolean {
    return this.favMoviesSet.has(movieId);
  }
}