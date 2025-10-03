// 代码生成时间: 2025-10-03 18:52:06
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Duplicate File Detector';
  filesToProcess: File[] = [];
  duplicates: string[] = [];

  /*
   * Method to handle file selection.
   * It uses the Angular NgForm to access the files.
   */
  handleFileSelect(form: NgForm): void {
    const files = form.value.files as FileList;
    if (files.length === 0) {
      alert('No files selected.');
      return;
    }

    this.filesToProcess = Array.from(files);
    this.findDuplicates();
  }

  /*
   * Method to find and list duplicate files.
   */
  findDuplicates(): void {
    const filesMap = new Map();
    this.duplicates = [];

    for (const file of this.filesToProcess) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result as string;
        const hash = this.calculateHash(fileContent);

        if (filesMap.has(hash)) {
          this.duplicates.push(file.name);
        } else {
          filesMap.set(hash, true);
        }
      };
      reader.onerror = () => {
        console.error('Failed to read file: ' + file.name);
      };
      reader.readAsText(file);
    }
  }

  /*
   * Helper method to calculate a simple hash of the file content.
   * This is a basic implementation and can be replaced with a more robust hash function.
   */
  calculateHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }

  /*
   * Method to clear the duplicates list and reset the application.
   */
  clearDuplicates(): void {
    this.duplicates = [];
  }
}

/*
 * FileService
 * A simple service to handle file-related operations.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  /*
   * Method to upload files to a server.
   * This is a placeholder and should be replaced with actual upload logic.
   */
  uploadFiles(files: File[]): Observable<any> {
    // Placeholder for file upload logic
    console.log('Files to be uploaded:', files);
    return this.http.post('/api/upload', files);
  }
}
