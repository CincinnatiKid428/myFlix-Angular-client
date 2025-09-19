//File: src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Handles HTTP errors encountered during API calls
import { handleError } from './utils/error-handler';

import { AppSettings } from './app-settings';
const DEBUG_LOG = AppSettings.DEBUG_LOG; // controls logging

//API URL that will provide data for the client app
const apiUrl = 'https://fast-taiga-09096-54ce00eca848.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

/**
 * Provides functions to access movie_api backend with HTTP requests.
 * @author P. Weaver
 */
export class FetchApiDataService {

  /**
   * Injects the HttpClient module to the constructor params making it available via this.http
   * @param http - HttpClient instance
   */
  constructor(private http: HttpClient) { }

  /**
   * Creates auth headers with bearer token set from localStorage
   * @returns HttpHeaders with 'Authorization' and 'Content-Type' along with bearer token
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  /* +-------------------------------------------------------+
     |              Users API Functions                      |
     +-------------------------------------------------------+ */

  /**
   * Registers a new user account.
   * @returns `Observable` that resolves to JSON object containing account information
   * @remarks
   * Calls API endpoint `POST /users`
   * 
   * Example response: 
   * ```json
   *   {
   *       "Username": "Test123",
   *       "Password": "$2b$10$EUN1sp/Qg0XQnwvTZwwM8.fl8GZVRFmuwJ8x6V3VJraFeZsGwKMLG",
   *       "Email": "Email123@email.com",
   *       "Birthdate": "2001-01-19T00:00:00.000Z",
   *       "FavoriteMovies": [],
   *       "_id": "68caf703442939d1fb7a013a",
   *       "__v": 0
   *   }
   * ```
   */
  public userRegistration(userDetails: any): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userRegistration() :`, userDetails);

    return this.http.post(`${apiUrl}/users`, userDetails).pipe(
      catchError(handleError)
    );
  }

  /**
   * Logs in the user account, authenticates on backend.
   * @returns `Observable` that resolves to JSON object with user data and auth token
   * @remarks
   * Calls API endpoint `POST /login`
   * 
   * Example response:
   * ```json
   *   {
   *       "user": {
   *           "_id": "68caf703442939d1fb7a013a",
   *           "Username": "Test123",
   *           "Password": "$2b$10$EUN1sp/Qg0XQnwvTZwwM8.fl8GZVRFmuwJ8x6V3VJraFeZsGwKMLG",
   *           "Email": "Email123@email.com",
   *           "Birthdate": "2001-01-19T00:00:00.000Z",
   *           "FavoriteMovies": [],
   *           "__v": 0
   *       },
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNhZjcwMzQ0MjkzOWQxZmI3YTAxM2EiLCJVc2VybmFtZSI6IlRlc3QxMjMiLCJQYXNzd29yZCI6IiQyYiQxMCRFVU4xc3AvUWcwWFFud3ZUWnd3TTguZmw4R1mlydGhkYXRlIjoiMjAwMS0wMS0xOVQwMDowMDowMC4wMDBaIiwiRmF2b33ZpZXMiOltdLCJfX3YiOjAsImlhdCI6MTc1O"
   *   }
   * ```
   */
  public userLogin(userDetails: any): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userLogin() :`, userDetails);

    return this.http.post(`${apiUrl}/login`, userDetails).pipe(
      catchError(handleError)
    );
  }

  /**
   * Updates user account information (Password, Email, Birthdate).
   * @returns `Observable` that resolves to JSON object with updated user data
   * @remarks
   * Calls API endpoint `PUT /users/:Username`
   * 
   * Example response: 
   * ```json
   *   {
   *       "_id": "68caf703442939d1fb7a013a",
   *       "Username": "Test123",
   *       "Password": "$2b$10$A3tJTXdYyD0V6qPN7.vl0eW/8QW0jcnwrKGRXGhFULjSaL9BIfoO6",
   *       "Email": "myNewEmail@email.com",
   *       "Birthdate": "1999-10-31T00:00:00.000Z",
   *       "FavoriteMovies": [],
   *       "__v": 0
   *   }
   * ```
   */
  public userUpdateAcctInfo(userDetails: any, username: string): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userUpdateAcctInfo() :`, userDetails);

    return this.http.put(`${apiUrl}/users/${username}`, userDetails, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
  }

  /**
   * Adds a movie to user's Favorite Movies.
   * @param movieID - String representing movie's _id field
   * @returns `Observable` that resolves JSON response with updated user object
   * @remarks
   * Calls API endpoint `POST /movies/favorites/:MovieID`
   * 
   * Adds the movieID to user.FavoriteMovies[] Array.
   * 
   * Example response (add movieID: "671ec4d7577ed8cab386b025"): 
   * ```json
   *   {
   *       "_id": "68caf703442939d1fb7a013a",
   *       "Username": "Test123",
   *       "Password": "$2b$10$x4YPLb82YlGtHr1/O.BcV.06IfvhRBcM5Dur5In6Ivuq3K8qmyery",
   *       "Email": "myNewEmail@email.com",
   *       "Birthdate": "1999-10-31T00:00:00.000Z",
   *       "FavoriteMovies": [
   *           "671eb9b9577ed8cab386b021",
   *           "671ec257577ed8cab386b023",
   *           "671ebe39577ed8cab386b022",
   *           "671ec4d7577ed8cab386b025"
   *       ],
   *       "__v": 0
   *   }
   * ```
   */
  public userAddFavMovie(movieID: string): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userAddFavMovie() :`, movieID);

    return this.http.post(`${apiUrl}/movies/favorites/${movieID}`, null, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
  }

  /**
   * Removes a movie to user's Favorite Movies.
   * @param movieID - String representing movie's _id field
   * @returns `Observable` that resolves JSON response with updated user object
   * @remarks
   * Calls API endpoint `DELETE /movies/favorites/:MovieID`
   * 
   * Removes the movieID from user.FavoriteMovies[] Array.
   * 
   * Example response (remove movieID: "671ec4d7577ed8cab386b023"): 
   * ```json
   *   {
   *       "_id": "68caf703442939d1fb7a013a",
   *       "Username": "Test123",
   *       "Password": "$2b$10$x4YPLb82YlGtHr1/O.BcV.06IfvhRBcM5Dur5In6Ivuq3K8qmyery",
   *       "Email": "myNewEmail@email.com",
   *       "Birthdate": "1999-10-31T00:00:00.000Z",
   *       "FavoriteMovies": [
   *           "671eb9b9577ed8cab386b021",
   *           "671ebe39577ed8cab386b022",
   *           "671ec4d7577ed8cab386b025"
   *       ],
   *       "__v": 0
   *   }
   * ```
   */
  public userDeleteFavMovie(movieID: string): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userDeleteFavMovie() :`, movieID);

    return this.http.delete(`${apiUrl}/movies/favorites/${movieID}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
  }

  /**
   * Deregisters a user account.
   * @returns `Observable` that resolves to Text response
   * @remarks
   * Calls API endpoint `DELETE /users/`
   * 
   * Example response: `DELETE successful : account Test123 has been removed.`
   */
  public userDeregistration(): Observable<any> {
    DEBUG_LOG && console.log(`*FetchApiDataService|userDeregistration()`);

    return this.http.delete(`${apiUrl}/users/`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' //Needs to be set, Angular expects JSON by default
    }).pipe(
      catchError(handleError)
    );
  }


  /* +-------------------------------------------------------+
     |             Movies API Functions                      |
     +-------------------------------------------------------+ */


  /**
   * Calls API for information on all movies
   * @returns `Observable` that resolves to Array of JSON objects, each containing data for one movie
   * @remarks
   * Uses API endpoint `GET /movies`
   * 
   * Example response:
   * ```json
   *  [
   *      {
   *          "Genre": {
   *              "Name": "Drama",
   *              "Description": "The drama genre is a broad category that features stories portraying human experiences, emotions, conflicts, and relationships in a realistic and emotionally impactful way. Dramas delve into the complexities of human life, often exploring themes of love, loss, morality, societal issues, personal growth, with the aim to evoke an emotional response from the audience by presenting relatable and thought-provoking stories."
   *          },
   *          "Director": {
   *              "Name": "Frank Darabont",
   *              "Bio": "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France...",
   *              "BirthYear": "1959",
   *              "DeathYear": null,
   *              "Movies": [
   *                  "The Shawshank Redemption",
   *                  "The Green Mile",
   *                  "The Majestic"
   *              ]
   *          },
   *          "_id": "671ea93b577ed8cab386b01e",
   *          "Title": "The Shawshank Redemption",
   *          "ReleaseYear": "1994",
   *          "Rating": "9.3",
   *          "Description": "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
   *          "Actors": [
   *              "Tim Robbins",
   *              "Morgan Freeman",
   *              "Bob Gunton"
   *          ],
   *          "ImageURL": "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
   *          "Featured": true
   *      },
   *      ...,
   *      {
   *          "Genre": {
   *              "Name": "Action",
   *              "Description": "The action genre features fast-paced, thrilling, and intense sequences of physical feats, combat, and excitement. The characters of these stories are involved in daring and often dangerous situations, requiring them to rely on their physical prowess, skills, and quick thinking to overcome challenges and adversaries."
   *          },
   *          "Director": {
   *              "Name": "John McTiernan",
   *              "Bio": "John Campbell McTiernan Jr. (born January 8, 1951) is an American former filmmaker...",
   *              "BirthYear": "1951",
   *              "DeathYear": null,
   *              "Movies": [
   *                  "Predator",
   *                  "Die Hard",
   *                  "The Hunt for Red October",
   *                  "Last Action Hero",
   *                  "Rollerball"
   *              ]
   *          },
   *          "_id": "67c9f00b4df938ec9986b022",
   *          "Title": "Predator",
   *          "ReleaseYear": "1987",
   *          "Rating": "7.8",
   *          "Description": "A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.",
   *          "Actors": [
   *              "Arnold Schwarzenegger",
   *              "Carl Weathers",
   *              "Kevin Peter Hall",
   *              "Jesse Ventura",
   *              "Bill Duke"
   *          ],
   *          "ImageURL": "https://m.media-amazon.com/images/M/MV5BOWEzMDI0MTUtMjQ0Yy00MGRhLWI4YjAtZTgzZTM3NTYxZGJkXkEyXkFqcGc@._V1_SX300.jpg",
   *          "Featured": false
   *      }
   *  ]
   * ```
   */
  public getAllMovies(): Observable<any> {

    let data = this.http.get<any>(`${apiUrl}/movies`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
    DEBUG_LOG && console.log(`*FetchApiDataService|getAllMovies() :`, data);
    return data;
  }

  /**
   * Calls API for movie information lookup by title.
   * @param title - The title of the movie
   * @returns - `Observable` that resolves to JSON object containing information about the movie
   * @remarks
   * Uses API endpoint `GET /movies/:Title`
   * 
   * Example response:
   * ```json
   *   {
   *       "Title": "Fight Club",
   *       "ReleaseYear": "1999",
   *       "Rating": "8.8",
   *       "Description": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
   *       "Director": "David Fincher",
   *       "Genre": "Drama",
   *       "Actors": [
   *           "Brad Pitt",
   *           "Edward Norton",
   *           "Helena Bonham Carter",
   *           "Meat Loaf"
   *       ],
   *       "ImageURL": "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg",
   *       "Featured": true
   *   }
   * ```
   */
  public getMovieByTitle(title: string): Observable<any> {

    let data = this.http.get<any>(`${apiUrl}/movies/${title}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
    DEBUG_LOG && console.log(`*FetchApiDataService|getMovieByTitle() :`, data);
    return data;
  }

  /**
   * Calls API for director information lookup by name.
   * @param name - The name of the director
   * @returns - `Observable` that resolves to JSON object containing information about the director
   * @remarks
   * Uses API endpoint `GET /director/:Name`
   * 
   * Example response:
   * ```json
   *  {
   *    "Name" : "Rob Reiner",
   *    "Bio" : "A short biography about Rob Reiner..."
   *    "BirthYear" : "1947",
   *    "DeathYear" : "",
   *    "Movies" : ["Stand by Me", "When Harry Met Sally", "Misery", "A Few Good Men"]
   *  }
   * ```
   */
  public getDirectorByName(name: string): Observable<any> {

    let data = this.http.get<any>(`${apiUrl}/director/${name}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(handleError)
    );
    DEBUG_LOG && console.log(`*FetchApiDataService|getDirectorByName() :`, data);
    return data;
  }


  /**
   * Calls API for genre information lookup by name.
   * @param name - Genre name
   * @returns `Observable` that resolves to JSON response
   * @remarks 
   * Uses API endpoint: `GET /genre/:Name`
   * 
   * Example response:
   * ```json
   *   {
   *    "Name" : "Drama",
   *    "Description" : "The drama genre is characterized by..."
   *   }
   * ```
   */
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
