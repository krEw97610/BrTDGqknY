// 代码生成时间: 2025-09-30 17:52:45
// live_stream_service.js
// This service handles live streaming functionality using Angular framework.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {
  // Configuration for the live stream API endpoint
  private liveStreamApiUrl: string = 'https://api.yourlivestreamingplatform.com/stream';

  constructor(private http: HttpClient) {}

  // Function to start a live stream
  startStream(streamKey: string): Observable<any> {
    const url = `${this.liveStreamApiUrl}/start?streamKey=${streamKey}`;
    return this.http.post(url, {}).pipe(
      retry(3), // Retry up to 3 times
      catchError(this.handleError) // Handle any errors
    );
  }

  // Function to stop a live stream
  stopStream(streamKey: string): Observable<any> {
    const url = `${this.liveStreamApiUrl}/stop?streamKey=${streamKey}`;
    return this.http.post(url, {}).pipe(
      retry(3), // Retry up to 3 times
      catchError(this.handleError) // Handle any errors
    );
  }

  // Handle HTTP errors
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status} with error message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
