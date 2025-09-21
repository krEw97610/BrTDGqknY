// 代码生成时间: 2025-09-21 14:50:58
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentConverterService {
  private baseUrl: string = 'https://api.document-converter.com'; // Base URL for the document conversion API

  constructor(private http: HttpClient) {
  }

  /**
   * Converts a document from one format to another.
   * @param filePath The path to the source document.
   * @param outputFormat The desired format of the output document.
   * @returns An Observable of the converted document's path.
   */
  convertDocument(filePath: string, outputFormat: string): Observable<string> {
    const url = `${this.baseUrl}/convert`;
    const body = {
      filePath: filePath,
      outputFormat: outputFormat
    };

    return this.http.post(url, body).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Handle HTTP errors.
   * @param error The error to handle.
   * @returns An Observable that will emit a user-friendly error message.
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * Checks if the output format is valid.
   * @param format The format to validate.
   * @returns True if the format is valid, false otherwise.
   */
  private isValidFormat(format: string): boolean {
    const validFormats = ['pdf', 'docx', 'txt'];
    return validFormats.includes(format.toLowerCase());
  }
}
