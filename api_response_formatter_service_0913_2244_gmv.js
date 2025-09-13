// 代码生成时间: 2025-09-13 22:44:48
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseFormatterService {

  constructor() {}

  /**
   * Formats the API response by applying predefined rules.
   * @param {Object} response - The raw API response object.
   * @param {Object} rules - The formatting rules to be applied.
   * @returns {Object} - The formatted API response.
   * @throws Will throw an error if the response or rules are invalid.
   */
  formatResponse(response: any, rules: any): any {
    // Check if the response is valid
    if (!response) {
      throw new Error('Invalid API response.');
    }

    // Check if the rules are valid
    if (!rules) {
      throw new Error('Invalid formatting rules.');
    }

    // Create a deep copy of the response to avoid mutating the original data
    const formattedResponse = JSON.parse(JSON.stringify(response));

    // Iterate over the rules and apply them to the response
    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        const rule = rules[key];
        // Check if the rule has a valid path and a valid formatting function
        if (!rule.path || typeof rule.format !== 'function') {
          throw new Error(`Invalid rule for key '${key}'`);
        }

        // Apply the rule to the response
        const pathParts = rule.path.split('.');
        let current = formattedResponse;
        for (const part of pathParts) {
          if (!current[part]) {
            throw new Error(`Path '${rule.path}' does not exist in the response`);
          }
          current = current[part];
        }
        current = rule.format(current);
      }
    }

    return formattedResponse;
  }
}
