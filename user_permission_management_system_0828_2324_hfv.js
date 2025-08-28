// 代码生成时间: 2025-08-28 23:24:25
// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionService } from './permission.service';
import { UserPermission } from './user-permission.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-permission-management',
  templateUrl: './user-permission-management.component.html',
  styleUrls: ['./user-permission-management.component.css']
})
export class UserPermissionManagementComponent implements OnInit {
  // User permission form
  permissionForm: FormGroup;
  // Error message
  errorMessage: string | null = null;

  // Inject required services
  constructor(
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Initialize the form and load permissions on component initialization
  ngOnInit(): void {
    this.createForm();
    this.loadPermissions();
  }

  // Create the permission form
  private createForm(): void {
    this.permissionForm = this.fb.group({
      username: ['', [Validators.required]],
      permissions: [[], [Validators.required]]
    });
  }

  // Load permissions from the service
  private loadPermissions(): void {
    this.permissionService.getPermissions().subscribe({
      next: (permissions: UserPermission[]) => {
        // Populate the permissions dropdown
        this.permissionForm.get('permissions')?.setValue(permissions.map(p => p.id));
      },
      error: (err: any) => {
        this.handlePermissionError(err);
      }
    });
  }

  // Handle permission error
  private handlePermissionError(err: any): void {
    this.errorMessage = 'Failed to load permissions: ' + err.error.message;
    this.snackBar.open(this.errorMessage, 'OK', {
      duration: 3000
    });
  }

  // Save permissions
  savePermissions(): void {
    if (this.permissionForm.valid) {
      const userData = this.permissionForm.value;
      this.permissionService.savePermissions(userData).subscribe({
        next: (data: any) => {
          this.snackBar.open('Permissions saved successfully', 'OK', {
            duration: 3000
          });
          this.router.navigate(['/permissions']);
        },
        error: (err: any) => {
          this.handlePermissionError(err);
        }
      });
    } else {
      this.snackBar.open('Please fill in the form correctly', 'OK', {
        duration: 3000
      });
    }
  }
}

/*
 * Permission Service
 * This service handles communication with the backend for permission-related operations.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserPermission } from './user-permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private apiUrl = 'api/permissions';

  constructor(private http: HttpClient) {}

  // Get permissions
  getPermissions(): Observable<UserPermission[]> {
    return this.http.get<UserPermission[]>(this.apiUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Save permissions
  savePermissions(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Handle HTTP error
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Server returned code ${error.status} with body: "\${error.error}"`;
    }
    return throwError(errorMessage);
  }
}

/*
 * User Permission Model
 * This represents the structure of the user permission data.
 */
export interface UserPermission {
  id: number;
  name: string;
  description: string;
}
