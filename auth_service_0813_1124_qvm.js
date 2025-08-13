// 代码生成时间: 2025-08-13 11:24:13
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://api.example.com/auth/login';
  private logoutUrl = 'https://api.example.com/auth/logout';
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Authenticates a user with the provided credentials and returns an observable.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Observable<any>} An observable that will emit the authentication result.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Logs out the current user and redirects to the login page.
   * @returns {void}
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is authenticated by checking the presence of the auth token.
   * @returns {boolean} True if the user is authenticated, otherwise false.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Handles HTTP errors and returns an observable that will emit an error message.
   * @param {any} error - The error object.
   * @returns {Observable<never>} An observable that will emit the error message.
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    // Return an observable with a user-facing error message.
    return Observable.throw(errorMessage);
  }
}
