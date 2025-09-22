// 代码生成时间: 2025-09-22 15:39:32
import { Component } from '@angular/core';

@Component({
  selector: 'app-json-data-converter',
  templateUrl: './json-data-converter.component.html',
  styleUrls: ['./json-data-converter.component.css']
})
export class JsonDataConverterComponent {
  // Input JSON data
  inputData: string = '{"key": "value"}';
  
  // Output JSON format
  outputData: string;
  
  // Error message
  errorMessage: string = '';
  
  // Converts the input JSON data to a different format
  convertData(): void {
    try {
      // Parse the input JSON string into an object
      const parsedInput = JSON.parse(this.inputData);
      
      // Convert the object back to a JSON string
      this.outputData = JSON.stringify(parsedInput, null, 2);
    } catch (error) {
      this.errorMessage = 'Error converting JSON data: ' + error.message;
    }
  }

  // Resets the component's state
  reset(): void {
    this.inputData = '{"key": "value"}';
    this.outputData = '';
    this.errorMessage = '';
  }
}
