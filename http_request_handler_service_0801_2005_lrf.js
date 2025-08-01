// 代码生成时间: 2025-08-01 20:05:34
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandlerService {
  
  // Constructor that injects the HttpClient service
  constructor(private http: HttpClient) { }

  /**
   * Performs a GET request to the specified URL.
   * @param url The URL to which the GET request is sent.
   * @returns An Observable of the response data.
   */
  get(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Performs a POST request to the specified URL with the given body.
   * @param url The URL to which the POST request is sent.
   * @param body The data to be sent in the body of the POST request.
   * @returns An Observable of the response data.
   */
  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Performs a PUT request to the specified URL with the given body.
   * @param url The URL to which the PUT request is sent.
   * @param body The data to be sent in the body of the PUT request.
   * @returns An Observable of the response data.
   */
  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Performs a DELETE request to the specified URL.
   * @param url The URL to which the DELETE request is sent.
   * @returns An Observable of the response data.
   */
  delete(url: string): Observable<any> {
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles any errors that occur during an HTTP request.
   * @param error The error that occurred.
   * @returns An Observable that will throw the error.
   */
  private handleError(error: any) {
    let errorMessage = 'An error occurred: ';
    errorMessage += error.message ? error.message : error.status ? `Error ${error.status}` : 'Unknown error';
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
