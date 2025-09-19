// src/app/movie-card/movie-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; //To use [(NgModel)] for filter
import { NgFor } from '@angular/common';

//Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; //Used for favorite toggle button
import { MatButtonToggleModule } from '@angular/material/button-toggle'; //Used for movie filter

//API service import
import { FetchApiDataService } from '../fetch-api-data.service';

//Application component imports
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

import { AppSettings } from '../app-settings';
const DEBUG_LOG = AppSettings.DEBUG_LOG; // controls logging

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

/**
 * Movie card component featuring list of movies, favorites filter. favorites toggle and info dialog buttons.
 * @author P. Weaver
 * @remarks
 * The component will fetch all movies information and create a favorites set in `localStorage` for use in template.
 * 
 * Add/Remove movie to/from favorites toggle will update database & `localStorage`.
 * 
 * Genre, Director, Details buttons will open dialogs with more information about each.
 * 
 * Favorites filter displays 3 options for movies in template: All/Favorites/Non-Favorites.
 */
export class MovieCardComponent implements OnInit {

  movies: any[] = []; //Will hold array of all movies
  favMoviesSet: Set<string> = new Set(); //Initialize to empty Set
  selectedFilter: 'all' | 'favorites' | 'non-favorites' = 'all';  //Will be used to select movie list filter

  /**
   * Injects parameters into class.
   * @param fetchApiData API service instance used to call `getAllMovies()`, `userAddFavMovie()`,`userDeleteFavMovie()`
   * @param dialog `MatDialog` instance used for opening info dialogs from this component
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  /**
   * Calls prep functions for movie data and user favorites.
   */
  ngOnInit(): void {
    this.getUserFavoriteMovies();
    this.getMovies();
  }

  /**
   * Fetches all movies data via API call.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      DEBUG_LOG && console.log('* *getMovies():', this.movies);
    });
  }

  /**
   * Filters all movies array into 'favorites', 'non-favorites' or 'all'.
   * @returns The array of filtered movies
   */
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

  /**
   * Opens director information dialog about specified director.
   * @param directorName Director's name to show information about
   */
  openDirectorDialog(directorName: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: directorName,
      width: '80%'
    });
  }

  /**
   * Opens genre information dialog about specified genre.
   * @param genreName Genre name to show information about
   */
  openGenreDialog(genreName: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: genreName,
      width: '80%'
    });
  }

  /**
   * Opens movie details dialog for specified movie.
   * @param movieData Movie data object containing all information
   */
  openMovieDetailsDialog(movieData: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: movieData,
      width: '80%'
    });
  }

  /**
   * Creates the `Set` of favorite movies based on `localStorage` user.
   */
  getUserFavoriteMovies(): void {
    let user: string = localStorage.getItem('user') || '';
    let parsedUser: any = JSON.parse(user);
    this.favMoviesSet = new Set(parsedUser.FavoriteMovies);
    DEBUG_LOG && console.log(`* * ${parsedUser.Username} FavoriteMovies:`, this.favMoviesSet);
  }

  //Handles toggling fav movieId if API call returns successfully & updates localStorage
  toggleFavMovie(movieId: string): void {

    if (this.favMoviesSet.has(movieId)) {
      //Call API remove and if successful update set
      this.fetchApiData.userDeleteFavMovie(movieId).subscribe((resp) => {
        DEBUG_LOG && console.log(`* * Response from deleting ${movieId}:`, resp);
        //Update the Set favMoviesSet
        this.favMoviesSet.delete(movieId);
      });

    } else {
      //Call API add and if successful update set
      this.fetchApiData.userAddFavMovie(movieId).subscribe((resp) => {
        DEBUG_LOG && console.log(`* * Response from adding ${movieId}:`, resp);
        //Update the Set favMoviesSet
        this.favMoviesSet.add(movieId);
      });
    }
    //Update localStorage with new favorites (will set to same list if add/delete fails)
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favMoviesSet));
  }

  /**
   * Checks if a movie id is in the user's favorites list.
   * @param movieId Movie being checked (`_id` field)
   * @returns `true` if `movieID` is in `this.favMoviesSet`, `false` otherwise
   */
  isFavorite(movieId: any): boolean {
    return this.favMoviesSet.has(movieId);
  }
}