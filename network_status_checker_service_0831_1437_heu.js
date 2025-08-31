// 代码生成时间: 2025-08-31 14:37:31
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * NetworkStatusCheckerService is a service that checks the network connectivity status.
 * It uses Angular's HttpClient to ping a server and determine if the network is up.
 */
@Injectable({
  providedIn: 'root'
})
export class NetworkStatusCheckerService {
  private pingUrl = 'https://www.googleapis.com/ping'; // URL to ping to check connectivity

  constructor(private http: HttpClient) {
  }

  /**
   * Checks the network connectivity by attempting to make a GET request to the ping URL.
   * @returns {Observable<boolean>} An observable that emits a boolean indicating the connectivity status.
   */
  checkConnectivity(): Observable<boolean> {
    return this.http.get(this.pingUrl).pipe(
      map(() => true), // If the request is successful, emit true
      catchError(() => of(false)) // If there's an error, emit false
    );
  }
}
