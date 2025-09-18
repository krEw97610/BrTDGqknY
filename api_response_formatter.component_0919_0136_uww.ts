// 代码生成时间: 2025-09-19 01:36:55
import { Component } from '@angular/core';

@Component({
  selector: 'app-api-response-formatter',
  template: `
    <div>
      <h2>API Response Formatter</h2>
      <textarea [(ngModel)]='apiResponse' rows='10' cols='50'></textarea>
      <br>
      <button (click)='formatResponse()'>Format Response</button>
      <br>
      <div *ngIf='formattedResponse'>
        <h3>Formatted Response:</h3>
        <pre>{{ formattedResponse }}</pre>
      </div>
      <div *ngIf='error'>
        <p>Error: {{ error }}</p>
      </div>
    </div>
  `,
})
export class ApiResponseFormatterComponent {
  // Holds the raw API response
  apiResponse: string = '';
  // Holds the formatted API response
  formattedResponse: string | null = null;
  // Holds any error messages
  error: string | null = null;

  /**
   * Attempts to format the API response.
   * It tries to parse the response as JSON and format it.
   * If parsing fails or any other error occurs, an error message is set.
   */
  formatResponse(): void {
    try {
      // Attempt to parse the response as JSON
      const jsonResponse = JSON.parse(this.apiResponse);
      // Format the JSON response in a user-friendly way
      this.formattedResponse = JSON.stringify(jsonResponse, null, 2);
      // Clear any existing error message
      this.error = null;
    } catch (e: any) {
      // Set an error message if parsing fails or any other error occurs
      this.error = e.message;
      // Clear the formatted response
      this.formattedResponse = null;
    }
  }
}
