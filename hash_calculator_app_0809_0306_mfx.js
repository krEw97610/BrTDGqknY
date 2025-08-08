// 代码生成时间: 2025-08-09 03:06:51
 * @description A simple Angular application that allows users to calculate hash values for strings.
 * @author Your Name
 * @version 1.0
 */

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-hash-calculator',
  template: `
    <div>
      <h1>Hash Calculator</h1>
      <input [(ngModel)]='inputString' type='text' placeholder='Enter a string' />
      <select [(ngModel)]='hashType'>
        <option value='MD5'>MD5</option>
        <option value='SHA256'>SHA-256</option>
        <option value='SHA512'>SHA-512</option>
      </select>
      <button (click)='calculateHash()'>Calculate Hash</button>
      <p *ngIf='hashResult'>Hash Result: {{ hashResult }}</p>
    </div>
  `,
  styleUrls: ['./hash_calculator_app.css']
})
export class HashCalculatorAppComponent {
  inputString: string = '';
  hashType: string = 'MD5';
  hashResult: string | null = null;

  constructor(private http: HttpClient) {
    // Constructor logic here if needed
  }

  // Method to calculate hash
  calculateHash(): void {
    if (!this.inputString) {
      console.error('Input string is empty.');
      return;
    }

    try {
      switch (this.hashType) {
        case 'MD5':
          this.hashResult = CryptoJS.MD5(this.inputString).toString();
          break;
        case 'SHA256':
          this.hashResult = CryptoJS.SHA256(this.inputString).toString();
          break;
        case 'SHA512':
          this.hashResult = CryptoJS.SHA512(this.inputString).toString();
          break;
        default:
          throw new Error('Unsupported hash type.');
      }
    } catch (error) {
      console.error('Error calculating hash:', error);
      this.hashResult = null;
    }
  }
}

// This module is not provided in this code snippet but should be created to bootstrap the application.
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { HashCalculatorAppComponent } from './hash_calculator_app.component';

// @NgModule({
//   declarations: [
//     HashCalculatorAppComponent
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     FormsModule
//   ],
//   providers: [],
//   bootstrap: [HashCalculatorAppComponent]
// })
// export class AppModule {}