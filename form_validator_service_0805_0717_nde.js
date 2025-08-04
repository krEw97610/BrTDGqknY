// 代码生成时间: 2025-08-05 07:17:57
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() {}

  /**
   * Validates that a string is not empty.
   * @param value The string value to validate.
   * @returns A string error message if the value is empty, otherwise null.
   */
  notEmpty(value: string): string | null {
    if (!value.trim()) {
      return 'This field cannot be empty.';
    }
    return null;
  }

  /**
   * Validates an email address format.
   * @param value The email address to validate.
   * @returns A string error message if the email is invalid, otherwise null.
   */
  validateEmail(value: string): string | null {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address.';
    }
    return null;
  }

  /**
   * Validates that a string matches a pattern.
   * @param value The string value to validate.
   * @param pattern The regular expression pattern to match.
   * @returns A string error message if the value does not match the pattern, otherwise null.
   */
  validatePattern(value: string, pattern: RegExp): string | null {
    if (!pattern.test(value)) {
      return 'The value does not match the required pattern.';
    }
    return null;
  }

  /**
   * Validates that a number is within a specific range.
   * @param value The number to validate.
   * @param min The minimum value in the range.
   * @param max The maximum value in the range.
   * @returns A string error message if the number is out of range, otherwise null.
   */
  validateRange(value: number, min: number, max: number): string | null {
    if (value < min || value > max) {
      return `The value must be between ${min} and ${max}.`;
    }
    return null;
  }

  /**
   * Validates that two fields have the same value.
   * @param value1 The value of the first field.
   ** @param value2 The value of the second field.
   * @returns A string error message if the values are different, otherwise null.
   */
  validateEquality(value1: any, value2: any): string | null {
    if (value1 !== value2) {
      return 'The values must be the same.';
    }
    return null;
  }
}
