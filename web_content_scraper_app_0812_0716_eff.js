// 代码生成时间: 2025-08-12 07:16:06
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ScraperService } from './scraper.service';

// WebContentScraperApp Module
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ScraperService
  ],
  bootstrap: [AppComponent]
})
export class WebContentScraperAppModule { }

// AppComponent for displaying the scraper interface
import { Component } from '@angular/core';
import { ScraperService } from './scraper.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Web Content Scraper</h1>
      <input #url type="text" placeholder="Enter URL to scrape" (keyup.enter)="scrapeContent(url.value)"/>
      <button (click)="scrapeContent(url.value)">Scrape</button>
      <p *ngIf="content">Scrape Result:</p>
      <pre *ngIf="content">{{ content }}</pre>
      <p *ngIf="error">Error: {{ error }}</p>
    </div>
  `,
  styles: []
})
export class AppComponent {
  content: string | null = null;
  error: string | null = null;

  constructor(private scraperService: ScraperService) { }

  // Function to scrape content from the provided URL
  scrapeContent(url: string): void {
    if (!url) {
      this.error = 'Please enter a valid URL';
      return;
    }
    this.error = null;
    this.content = null;
    this.scraperService.scrape(url)
      .subscribe({
        next: (result) => {
          this.content = result;
        },
        error: (err) => {
          this.error = err instanceof Error ? err.message : 'An error occurred';
        }
      });
  }
}

// ScraperService for handling the scraping logic
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  constructor(private http: HttpClient) { }

  // Scrape content from the provided URL
  scrape(url: string): Observable<string> {
    return this.http.get<string>(url, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Helper function to handle errors
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Failed to scrape content'));
  }
}
