// 代码生成时间: 2025-08-02 06:53:01
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileRenameService } from './file-rename.service'; // Import the service

@Component({
  selector: 'app-batch-rename-tool',
  templateUrl: './batch-rename-tool.component.html',
  styleUrls: ['./batch-rename-tool.component.css']
})
export class BatchRenameToolComponent {
  // FormGroup for the input form
  renameForm: FormGroup;

  constructor(private fb: FormBuilder, private fileRenameService: FileRenameService) {
    // Initialize the form group
    this.renameForm = this.fb.group({
      folderPath: ['', Validators.required],
      newNamePrefix: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.renameForm.invalid) {
      return;
    }

    const { folderPath, newNamePrefix } = this.renameForm.value;
    try {
      // Call the service to perform the renaming
      this.fileRenameService.renameFiles(folderPath, newNamePrefix).subscribe({
        next: (result) => {
          console.log('Files renamed successfully:', result);
        },
        error: (err) => {
          console.error('Error renaming files:', err);
        }
      });
    } catch (error) {
      console.error('Failed to rename files:', error);
    }
  }
}

/*
 * Angular Service for File Rename
 * This service provides the functionality to rename files in a batch.
 */

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileRenameService {
  constructor(private http: HttpClient) {}

  // Method to rename files
  renameFiles(folderPath: string, newNamePrefix: string): Observable<any> {
    return this.http.post<any>(`/api/rename-files`, { folderPath, newNamePrefix })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling method
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status ? `${error.status} - ${error.message}` : ''}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
