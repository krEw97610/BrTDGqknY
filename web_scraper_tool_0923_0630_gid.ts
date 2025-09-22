// 代码生成时间: 2025-09-23 06:30:49
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-web-scraper',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">{{ error }}</div>
    <div *ngIf="content">{{ content }}</div>
  `,
  styles: []
})
export class WebScraperComponent {
  content: string | null = null;
  loading = false;
  error = null;

  /**
   * Constructor that injects the HttpClient to fetch the web content.
   * @param http The HttpClient service to perform HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Method to fetch content from the specified URL.
   * @param url The URL from which to fetch the content.
   */
  fetchContent(url: string): void {
    if (!url) {
      this.error = 'URL is required';
      return;
    }

    this.loading = true;
    this.error = null;
    this.content = null;

    this.http.get(url, { responseType: 'text' })
      .pipe(
        tap(() => this.loading = false),
        catchError(error => {
          this.error = error.message || 'Unknown error';
          this.loading = false;
          return throwError(() => new Error('Could not fetch content'));
        }),
      )
      .subscribe(
        data => this.content = data,
        error => this.error = error.message || 'Unknown error',
        () => this.loading = false
      );
  }
}
