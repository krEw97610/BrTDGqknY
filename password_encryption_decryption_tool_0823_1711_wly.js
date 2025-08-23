// 代码生成时间: 2025-08-23 17:11:20
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

/**
 * Service for handling password encryption and decryption.
 */
@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private key: string = 'your-secret-key'; // Replace with your own secret key

  constructor() {
  }

  /**
   * Encrypts a password using AES encryption.
   * @param password The password to encrypt.
   * @returns The encrypted password as a base64 encoded string.
   */
  encryptPassword(password: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(password, this.key).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  /**
   * Decrypts a password using AES decryption.
   * @param encryptedPassword The base64 encoded encrypted password to decrypt.
   * @returns The decrypted password.
   */
  decryptPassword(encryptedPassword: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, this.key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }
}

/*
 * Example usage:
 *
 * const passwordService = new PasswordService();
 * const encrypted = passwordService.encryptPassword('myPassword123');
 * console.log('Encrypted:', encrypted);
 *
 * const decrypted = passwordService.decryptPassword(encrypted);
 * console.log('Decrypted:', decrypted);
 *
 */