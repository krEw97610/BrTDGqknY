// 代码生成时间: 2025-08-22 04:52:00
 * This application provides a simple interface to encrypt and decrypt passwords.
 * It uses JavaScript's built-in crypto module for encryption.
 *
 * @module PasswordEncryptionDecryptionApp
 */

import { Component } from '@angular/core';
import * as crypto from 'crypto';

@Component({
  selector: 'app-password-encryption-decryption',
  templateUrl: './password-encryption-decryption.component.html',
  styleUrls: ['./password-encryption-decryption.component.css']
})
export class PasswordEncryptionDecryptionComponent {
  // Input for user to provide the password
  password: string = '';

  // Encrypted password
  encryptedPassword: string = '';

  // Decrypted password
  decryptedPassword: string = '';

  // Error messages
  errorMessage: string = '';

  /**
   * Encrypts the password
   *
   * @param {string} password - The password to encrypt
   * @returns {string} - The encrypted password
   */
  encryptPassword(): void {
    try {
      // Use crypto's createCipher to encrypt the password
      const cipher = crypto.createCipher('aes256', process.env.ENCRYPTION_KEY);
      let encrypted = cipher.update(this.password, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      this.encryptedPassword = encrypted;
      this.errorMessage = '';
    } catch (error) {
      // Handle encryption errors
      this.errorMessage = 'Encryption failed: ' + error.message;
    }
  }

  /**
   * Decrypts the encrypted password
   *
   * @param {string} encryptedPassword - The encrypted password to decrypt
   * @returns {string} - The decrypted password
   */
  decryptPassword(): void {
    try {
      // Use crypto's createDecipher to decrypt the password
      const decipher = crypto.createDecipher('aes256', process.env.ENCRYPTION_KEY);
      let decrypted = decipher.update(this.encryptedPassword, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      this.decryptedPassword = decrypted;
      this.errorMessage = '';
    } catch (error) {
      // Handle decryption errors
      this.errorMessage = 'Decryption failed: ' + error.message;
    }
  }
}
