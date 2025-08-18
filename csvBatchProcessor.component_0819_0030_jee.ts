// 代码生成时间: 2025-08-19 00:30:28
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CsvService } from './csv.service'; // Import CSV service for file processing

@Component({
  selector: 'app-csv-batch-processor',
  template: `
    <div>
      <input type="file" (change)="onFileSelect($event)" multiple />
      <button (click)="processFiles()" [disabled]="!files">Process</button>
      <div *ngIf="error">{{ error }}</div>
      <pre *ngIf="result">{{ result }}</pre>
    </div>
  `,
  styleUrls: ['./csvBatchProcessor.component.css']
})
export class CsvBatchProcessorComponent {
  // Holds the CSV files selected by the user
  files: File[] = [];
  // Holds the result of the file processing
  result: string | null = null;
  // Holds any error message
  error: string | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private csvService: CsvService) {}

  // Handles the file selection event
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
    } else {
      this.error = 'No files selected.';
    }
  }

  // Processes the selected CSV files
  processFiles(): void {
    if (!this.files.length) {
      this.error = 'No files to process.';
      return;
    }
    this.error = null;
    this.result = null;

    // Iterate over the files and process each one
    for (const file of this.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          this.csvService.processCsv(content).then((processedData) => {
            this.result = this.result ? `${this.result}
${processedData}` : processedData;
          });
        } catch (error) {
          this.error = error.message;
        }
      };
      reader.onerror = () => {
        this.error = 'Error reading file.';
      };
      reader.readAsText(file);
    }
  }
}

/*
 * CSV Service
 * This service is responsible for processing individual CSV files.
 */
import { Injectable } from '@angular/core';
import Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  // Processes the CSV content and returns the processed data
  processCsv(content: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Papa.parse(content, {
        header: true,
        complete: (results) => {
          // Process the CSV data
          // For this example, we'll just return the header row
          const header = results.data.map(row => row[Object.keys(row)[0]]).join(', ');
          resolve(header);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
}