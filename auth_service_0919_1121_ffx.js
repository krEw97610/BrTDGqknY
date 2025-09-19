// 代码生成时间: 2025-09-19 11:21:34
// Import necessary modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// Define the possible roles for simplicity
const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private userRole: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    // Constructor injects the Router and initializes the service
    constructor(private router: Router) {}

    // Method to log in a user with a given role
    login(role: string): void {
        try {
            // Check if the role exists
            if (!Object.values(ROLES).includes(role)) {
                throw new Error('Invalid role');
            }

            // Assume successful authentication and set the user role
            this.authenticated.next(true);
            this.userRole.next(role);

            console.log('User logged in with role:', role);
        } catch (error) {
            console.error('Login failed:', error.message);
            // Redirect to login page on error
            this.router.navigate(['/login']);
        }
    }

    // Method to log out the current user
    logout(): void {
        this.authenticated.next(false);
        this.userRole.next(null);
        console.log('User logged out');
        // Redirect to home page on logout
        this.router.navigate(['/home']);
    }

    // Method to check if the current user is authenticated
    isAuthenticated(): boolean {
        return this.authenticated.getValue();
    }

    // Method to check if the current user has a specific role
    hasRole(role: string): boolean {
        return this.userRole.getValue() === role;
    }

    // Method to get the current user role
    getUserRole(): string {
        return this.userRole.getValue();
    }
}
