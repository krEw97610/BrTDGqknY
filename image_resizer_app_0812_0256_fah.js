// 代码生成时间: 2025-08-12 02:56:38
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadImage } from 'blueimp-load-image';
import { ResizeObserver } from 'resize-observer-browser';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-image-resizer',
  template: `
    <div>
      <h1>Image Resizer</h1>
      <div *ngIf="errorMessage">{{ errorMessage }}</div>
      <form [formGroup]="resizeForm" (ngSubmit)="resizeImages()">
        <label for="imageFiles">Select Image Files:</label>
        <input id="imageFiles" type="file" accept="image/*" multiple formControlName="imageFiles" (change)="onFileSelect($event)" />
        <div *ngIf="resizeForm.controls.imageFiles.errors?.required">Image files are required.</div>
        <div *ngIf="resizeForm.controls.imageFiles.errors?.maxFiles">You can only select up to 5 images.</div>

        <label for="resizeWidth">Resize Width:</label>
        <input id="resizeWidth" type="number" formControlName="resizeWidth" />
        <label for="resizeHeight">Resize Height:</label>
        <input id="resizeHeight" type="number" formControlName="resizeHeight" />

        <button type="submit" [disabled]="!resizeForm.valid">Resize Images</button>
      </form>
      <div *ngIf="resizedImages.length">
        <h2>Resized Images:</h2>
        <div *ngFor="let image of resizedImages" style="display: inline-block; margin: 10px;">
          <img [src]="image" alt="Resized Image" style="width: 100px; height: auto;" />
        </div>
      </div>
    </div>
  `,
  styles: [
    ":host { display: block; }"
  ]
})
export class ImageResizerAppComponent {
  resizeForm: FormGroup;
  resizedImages: string[] = [];
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.resizeForm = this.fb.group({
      imageFiles: [null, [Validators.required, this.maxFilesValidator(5)]],
      resizeWidth: [null, Validators.required],
      resizeHeight: [null, Validators.required]
    });
  }

  // Validator to ensure the maximum number of files selected does not exceed 5
  private maxFilesValidator(maxFiles: number): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value;
      if (files && files.length > maxFiles) {
        return { maxFiles: { max: maxFiles } };
      }
      return null;
    };
  }

  // Event handler for file input changes
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);
    this.resizeForm.patchValue({ imageFiles: files }, { emitEvent: false });
  }

  // Submit handler for resizing images
  resizeImages(): void {
    this.resizedImages = [];
    this.errorMessage = null;

    const files = this.resizeForm.value.imageFiles;
    const width = this.resizeForm.value.resizeWidth as number;
    const height = this.resizeForm.value.resizeHeight as number;

    if (!files || !width || !height) {
      this.errorMessage = 'Please select images and specify resize dimensions.';
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Unable to get canvas context');
          }

          ctx.drawImage(img, 0, 0, width, height);
          const resizedImage = canvas.toDataURL('image/jpeg');
          this.resizedImages.push(resizedImage);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }
}

// Register ImageResizerAppComponent in your NgModule declarations and imports