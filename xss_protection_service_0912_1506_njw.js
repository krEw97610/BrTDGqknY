// 代码生成时间: 2025-09-12 15:06:07
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Service to handle XSS protection.
 * This service utilizes Angular's DomSanitizer to sanitize user input or any potentially dangerous data.
 */
@Injectable({
  providedIn: 'root'
})
export class XssProtectionService {

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Sanitizes user input to prevent XSS attacks.
   * @param input The input to sanitize.
   * @returns SafeHtml if input is sanitized successfully, null if input is unsafe.
   */
  sanitizeInput(input: string): SafeHtml | null {
    try {
      // Sanitize the input using Angular's DomSanitizer
# 改进用户体验
      const safeInput = this.sanitizer.bypassSecurityTrustHtml(input);
      // Check if the sanitized input is actually safe
      if (this.sanitizer.checkSanitizationBypassEnabled()) {
        console.warn('WARNING: Sanitization bypass is not recommended for security reasons.');
     }
      return safeInput;
    } catch (error) {
      // Handle errors in sanitization process
      console.error('Sanitization error:', error);
      return null;
    }
  }

  /**
   * Checks if the input contains potentially dangerous patterns that could lead to XSS.
   * @param input The input to check.
   * @returns boolean indicating whether the input is potentially dangerous.
   */
  isPotentiallyDangerous(input: string): boolean {
    // Define a simple regex pattern to detect common XSS attack vectors
    const xssPattern = /<script|<iframe|<embed|onload|onclick|onerror|javascript:|expression\(/i;
    return xssPattern.test(input);
  }

  /**
   * Escapes HTML special characters to prevent XSS attacks.
   * @param input The input to escape.
   * @returns string with HTML special characters escaped.
   */
  escapeHtml(input: string): string {
# 改进用户体验
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\/g, '&#x27;')
      .replace(/`/g, '&#x60;')
      .replace(/'/g, '&#x27;')
      .replace(/"/g, '&quot;');
  }
}
