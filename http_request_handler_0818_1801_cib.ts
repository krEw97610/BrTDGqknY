// 代码生成时间: 2025-08-18 18:01:53
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandlerService {

  constructor(private http: HttpClient) {
  }

  /**
   * Make a GET request to the specified URL.
   * @param url The URL to which the GET request will be made.
   * @returns An Observable of the response from the server.
   */
  get(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Make a POST request to the specified URL with a body.
   * @param url The URL to which the POST request will be made.
   * @param body The body of the POST request.
   * @returns An Observable of the response from the server.
   */
  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors.
   * @param error The HttpErrorResponse received from the server.
   * @returns An Observable that emits an error message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
