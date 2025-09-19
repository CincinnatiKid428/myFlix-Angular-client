//File : src/app/utils/error-handler.ts

import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

//Error handler for all http requests to movie_api backend
/**
 * Handles all errors from HTTP requests to movie_api backend.
 * @author P. Weaver
 * @param error Error caught from API HTTP request
 * @returns `Observable` that never emits value, immediately erroring with original `HttpErrorResponse`
 */
export function handleError(error: HttpErrorResponse): Observable<never> {
  if (error.error instanceof ErrorEvent) {
    console.error('A client-side or network error occurred:', error.error.message);
  } else {
    console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
  }

  return throwError(() => error);
}