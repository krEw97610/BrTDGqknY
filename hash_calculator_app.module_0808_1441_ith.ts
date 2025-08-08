// 代码生成时间: 2025-08-08 14:41:27
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HashCalculatorComponent } from './hash_calculator.component';

@NgModule({
  declarations: [
    HashCalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [HashCalculatorComponent]
})
export class HashCalculatorAppModule { }


/*
 * Hash Calculator Component
 * @author Your Name
 * @date Today's Date
 */
import { Component } from '@angular/core';
import { Sha256 } from 'hash.js';

@Component({
  selector: 'app-hash-calculator',
  template: `
    <div>
      <h2>Hash Calculator</h2>
      <input [(ngModel)]='inputText' (change)='calculateHash()' placeholder='Enter text here...'>
      <p>Hash: {{ hash }}</p>
    </div>
  `,
  styles: []
})
export class HashCalculatorComponent {
  inputText: string = '';
  hash: string = '';

  // Function to calculate SHA-256 hash
  calculateHash() {
    try {
      const sha256 = new Sha256();
      sha256.update(this.inputText);
      this.hash = sha256.digest('hex');
    } catch (error) {
      console.error('Error calculating hash:', error);
    }
  }

  // Angular lifecycle hook to initialize component
  ngOnInit() {
    // Initialization code if needed
  }
}
