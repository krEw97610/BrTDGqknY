// 代码生成时间: 2025-09-19 23:12:08
// XSS Protection Service for Angular
// This service provides a method to sanitize input to prevent XSS attacks.

import { Injectable } from '@angular/core';
import DOMPurify from 'dompurify'; // DOMPurify is a library to sanitize HTML from XSS

@Injectable({
  providedIn: 'root'
})
export class XssProtectionService {

  constructor() {}

  /**
   * Sanitizes the input to prevent XSS attacks.
   * @param input The input string to sanitize.
   * @returns The sanitized string.
   */
  sanitizeInput(input: string): string {
    try {
      // Use DOMPurify to sanitize the input to prevent XSS attacks
      return DOMPurify.sanitize(input);
    } catch (error) {
      // Handle any errors that occur during sanitization
      console.error('Error sanitizing input:', error);
      throw error;
    }
  }
}
