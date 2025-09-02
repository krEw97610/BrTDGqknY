// 代码生成时间: 2025-09-02 17:46:15
 * It includes error handling and ensures the code is maintainable and extensible.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  /**
   * Formats the API response by extracting the data from the response object.
   * @param endpoint The API endpoint to fetch data from.
   * @returns An observable containing the formatted response data.
   */
  public getFormattedResponse(endpoint: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.url}/${endpoint}`, { headers }).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * Handles errors that occur during API calls.
   * @param error The error object received from the API call.
   * @returns An observable containing the error message.
   */
  private handleError(error: any) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // API error
      errorMessage = `Error Code: ${error.status}
      Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
