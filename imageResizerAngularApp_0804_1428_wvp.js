// 代码生成时间: 2025-08-04 14:28:59
 * This Angular application allows users to batch resize images using a simple interface.
 */

// Import necessary Angular modules and services
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ResizeService } from './resize.service';
import { ResizerComponent } from './resizer.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AppComponent is the root component of the application
export class AppComponent {
  constructor() {
    // Any application-wide logic can be initialized here
  }
}

// ResizeService handles the logic for resizing images
export class ResizeService {
  constructor(private http: HttpClient) {
  }

  resizeImages(images, newWidth, newHeight) {
    return this.http.post('/api/resize', { images, newWidth, newHeight });
  }
}

// ResizerComponent is the component responsible for handling the user interface
export class ResizerComponent {
  newWidth: number;
  newHeight: number;
  images: File[];
  resizeError: string;

  constructor(private resizeService: ResizeService) {
    this.newWidth = 100;
    this.newHeight = 100;
  }

  onFileChange(event) {
    this.images = Array.from(event.target.files);
  }

  onResize() {
    if (!this.images || this.images.length === 0) {
      this.resizeError = 'Please select at least one image to resize.';
      return;
    }

    if (this.newWidth <= 0 || this.newHeight <= 0) {
      this.resizeError = 'Width and height must be positive numbers.';
      return;
    }

    this.resizeService.resizeImages(this.images, this.newWidth, this.newHeight).subscribe({
      next: (resizedImages) => {
        // Handle the resized images
        // This could involve saving them to a server or displaying them on the page
      },
      error: (error) => {
        this.resizeError = error.message;
      }
    });
  }
}

/*
 * HTML template for the ResizerComponent
 * <resizer-component></resizer-component>
 * Should be included in the main application template (app.component.html)
 */

/*
 * Sample HTML for ResizerComponent (resizer.component.html)
 */
import html from './resizer.component.html';
export default html;