//File: src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Handles errors encountered during API calls
import { handleError } from './utils/error-handler';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://fast-taiga-09096-54ce00eca848.herokuapp.com';

//Debug logging constant used to turn logging in user API endpoints on/off
const DEBUG_LOG = true;

@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params making it available via this.http
  constructor(private http: HttpClient) { }

  //Creates auth header with bearer token set from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  /* +-------------------------------------------------------+
     |             /users API Functions                      |
     +-------------------------------------------------------+ */


  //Makes API call for user registration endpoint: POST /users
  public userRegistration(userDetails: any): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userRegistration() :`, userDetails);

    return this.http.post(`${apiUrl}/users`, userDetails).pipe(
      catchError(handleError)
    );
  }

  //Makes API call for user login endpoint: POST /login
  public userLogin(userDetails: any): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userLogin() :`, userDetails);

    return this.http.post(`${apiUrl}/login`, userDetails).pipe(
      catchError(handleError)
    );
  }

  //Makes API call for user update account info endpoint: PUT /users/:Username
  public userUpdateAcctInfo(userDetails: any, username: string): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userUpdateAcctInfo() :`, userDetails);

    return this.http.put(`${apiUrl}/users/${username}`, userDetails, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
  }

  //Makes API call for user add favorite movie endpoint: POST /movies/favorites/:MovieID
  public userAddFavMovie(movieID: string): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userAddFavMovie() :`, movieID);

    return this.http.post(`${apiUrl}/movies/favorites/${movieID}`, null, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
  }

  //Makes API call for user delete favorite movie endpoint: DELETE /movies/favorites/:MovieID
  public userDeleteFavMovie(movieID: string): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userDeleteFavMovie() :`, movieID);

    return this.http.delete(`${apiUrl}/movies/favorites/${movieID}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
  }

  //Makes API call for user account deregistration endpoint: DELETE /users/
  public userDeregistration(): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userDeregistration()`);

    return this.http.delete(`${apiUrl}/users/`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    }).pipe(
      catchError(handleError)
    );
  }


  /* +-------------------------------------------------------+
     |            /movies API Functions                      |
     +-------------------------------------------------------+ */


  //Makes API call for get all movies endpoint: GET /movies
  public getAllMovies(): Observable<any> {

    let data = this.http.get<any>(`${apiUrl}/movies`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
    DEBUG_LOG && console.log(`*FetchApiDataService|getAllMovies() :`, data);
    return data;
  }

  //Makes API call for get 1 movie by title endpoint: GET /movies/:Title
  public getMovieByTitle(title: string): Observable<any> {

    let data = this.http.get<any>(`${apiUrl}/movies/${title}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
    DEBUG_LOG && console.log(`*FetchApiDataService|getMovieByTitle() :`, data);
    return data;
  }

  //Makes API call for director info by name endpoint: GET /director/:Name
  public getDirectorByName(name: string): Observable<any> {

    let data = this.http.get<any>(`${apiUrl}/director/${name}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
    DEBUG_LOG && console.log(`*FetchApiDataService|getDirectorByName() :`, data);
    return data;
  }

  //Makes API call for genre info by name endpoint: GET /genre/:Name
  public getGenreByName(name: string): Observable<any> {

    let data = this.http.get<any>(`${apiUrl}/genre/${name}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
    DEBUG_LOG && console.log(`*FetchApiDataService|getGenreByName() :`, data);
    return data;
  }

}
