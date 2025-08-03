// 代码生成时间: 2025-08-04 01:45:16
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * AuthService is responsible for handling user authentication.
 * It provides methods to login and logout users,
 * as well as to check the authentication status.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://api.example.com/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  /**
   * Attempts to log in a user with the provided credentials.
   * @param username the username of the user
   * @param password the password of the user
   * @returns an Observable that emits the authentication result
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl + '/login', { username, password })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // handle errors
      );
  }

  /**
   * Logs out the current user by clearing the authentication token.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Checks if the user is authenticated by verifying the token.
   * @returns true if the user is authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Saves the authentication token to local storage.
   * @param token the authentication token to save
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Private method to handle HTTP errors by transforming them into user-friendly messages.
   * @param error the error to handle
   * @returns an Observable that emits the error message
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Backend returned code ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
