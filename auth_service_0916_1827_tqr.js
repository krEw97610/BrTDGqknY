// 代码生成时间: 2025-09-16 18:27:11
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to store the authentication state
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  // Observable that can be subscribed to for authentication state changes
  get authState(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  constructor(private router: Router) {
    // Check initial authentication state from local storage or similar
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
    }
  }

  // Method to authenticate a user with credentials
  login(username: string, password: string): Observable<void> {
    return this.authServiceLogin(username, password).pipe(
      tap(
        () => {
          // Update authentication state
          this.isAuthenticated.next(true);
          // Redirect to home or desired page
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed:', error);
        }
      )
    );
  }

  // Method to logout the user
  logout(): void {
    // Clear the token and update authentication state
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  // Method to check if the user has access to a particular route
  hasAccess(route: string): boolean {
    // Implement access control logic here
    // For now, assume all authenticated users have access
    return this.isAuthenticated.value;
  }

  // Simulated method for logging in (replace with actual API call)
  private authServiceLogin(username: string, password: string): Observable<any> {
    // Simulate API call with a timeout
    return new Observable(observer => {
      setTimeout(() => {
        if (username === 'admin' && password === 'password') {
          // Simulate successful login by setting a token
          localStorage.setItem('token', 'some-token');
          observer.next('User authenticated');
          observer.complete();
        } else {
          observer.error('Authentication failed');
        }
      }, 1000);
    });
  }
}
