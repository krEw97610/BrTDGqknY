// 代码生成时间: 2025-08-12 18:02:14
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {Blob, File, FileList} from '@angular/platform-webworker';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-file-unzip-tool',
  templateUrl: './file-unzip-tool.component.html',
  styleUrls: ['./file-unzip-tool.component.css']
})
export class FileUnzipToolComponent {
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private zone: NgZone) {}

  // Event handler for file selection
  onFileSelected(event: Event): void {
    const files: FileList = (event.target as HTMLInputElement).files;
    if (files.length === 0) {
      console.error('No files selected');
      return;
    }

    const file: File = files[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onload = (e) => {
      const zip = new JSZip();
      zip.loadAsync(fileReader.result as ArrayBuffer)
        .then((zip) => {
          this.extractFiles(zip);
        })
        .catch((error) => {
          console.error('Error reading zip file:', error);
        });
    };

    fileReader.onerror = () => {
      console.error('FileReader error:', fileReader.error);
    };

    fileReader.readAsArrayBuffer(file);
  }

  // Extract files from the zip archive
  private extractFiles(zip: JSZip): void {
    const promises: Promise<void>[] = [];

    // Loop over all files in the zip archive and extract them
    Object.keys(zip.files).forEach((path: string) => {
      const file = zip.files[path];
      if (!file.dir) {
        const promise = this.zone.runOutsideAngular(() => {
          return file.async('blob').then((blob: Blob) => {
            this.saveFile(blob, file.name);
          });
        });
        promises.push(promise);
      }
    });

    // Wait for all the files to be extracted and saved
    Promise.all(promises).catch((error) => {
      console.error('Error extracting files:', error);
    });
  }

  // Save the extracted file to the local storage
  private saveFile(blob: Blob, filename: string): void {
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // Function to trigger file input click
  selectFile(): void {
    this.fileInput.nativeElement.click();
  }
}
