//File : src/app/utils/error-handler.ts

import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

//Error handler for all http requests to movie_api backend
export function handleError(error: HttpErrorResponse): Observable<never> {
  if (error.error instanceof ErrorEvent) {
    console.error('A client-side or network error occurred:', error.error.message);
  } else {
    console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
  }

  return throwError(() => new Error('Something bad happened; please try again later.'));
}