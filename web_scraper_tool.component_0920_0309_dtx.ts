// 代码生成时间: 2025-09-20 03:09:34
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-web-scraper-tool',
  templateUrl: './web_scraper_tool.component.html',
  styleUrls: ['./web_scraper_tool.component.css']
})
export class WebScraperToolComponent {
  private url: string = '';
  fetchedContent: string | null = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Fetches the content from the provided URL.
   * @param url The URL to fetch content from.
   */
  fetchContent(): void {
    this.error = null;
    this.fetchedContent = null;

    this.http.get(this.url, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    ).subscribe(
      data => {
        this.fetchedContent = data;
      },
      error => {
        this.error = error.message;
      }
    );
  }

  /**
   * Handles errors by updating the error message.
   * @param error The error object.
   */
  private handleError(error: any): void {
    // Log the error to the console for further investigation
    console.error('An error occurred:', error);
    // Let the app continue by returning an empty Observable with a user-facing error message
    this.error = 'Failed to fetch content.';
    return of('');
  }
}
