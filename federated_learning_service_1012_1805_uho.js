// 代码生成时间: 2025-10-12 18:05:45
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FederatedLearningService {
  private serverUrl: string = 'http://localhost:3000/api';

  /**
   * Constructor that injects the HttpClient module for HTTP requests.
   * @param http - HttpClient instance for making HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Sends the local model updates to the central server.
   * @param modelUpdate - The model update to be sent.
   * @returns An observable that emits the server response or an error.
   */
  public sendModelUpdate(modelUpdate: any): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/model-update`, modelUpdate)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves the global model from the central server.
   * @returns An observable that emits the global model or an error.
   */
  public getGlobalModel(): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/global-model`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Handles HTTP errors by returning user-friendly error messages.
   * @param error - The HTTP error received.
   * @returns An observable that emits the error message.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError('An error occurred: ' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return throwError(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
  }
}
