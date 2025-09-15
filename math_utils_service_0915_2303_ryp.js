// 代码生成时间: 2025-09-15 23:03:09
// Importing the Injectable decorator from Angular's core library.
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathUtilsService {
# 优化算法效率

  constructor() {
    // Constructor can be used to initialize any necessary variables or services.
  }

  /**
   * Adds two numbers.
   * @param {number} num1 - The first number to add.
   * @param {number} num2 - The second number to add.
   * @returns {number} The sum of the two numbers.
   * @throws {Error} If either num1 or num2 are not numbers.
   */
  add(num1: number, num2: number): number {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Error('Both arguments must be numbers.');
    }
    return num1 + num2;
  }

  /**
   * Subtracts one number from another.
   * @param {number} num1 - The number to subtract from.
   * @param {number} num2 - The number to subtract.
# 扩展功能模块
   * @returns {number} The result of the subtraction.
   * @throws {Error} If either num1 or num2 are not numbers.
   */
  subtract(num1: number, num2: number): number {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Error('Both arguments must be numbers.');
    }
    return num1 - num2;
  }

  /**
   * Multiplies two numbers.
   * @param {number} num1 - The first number to multiply.
   * @param {number} num2 - The second number to multiply.
   * @returns {number} The product of the two numbers.
   * @throws {Error} If either num1 or num2 are not numbers.
   */
# NOTE: 重要实现细节
  multiply(num1: number, num2: number): number {
# 优化算法效率
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
# FIXME: 处理边界情况
      throw new Error('Both arguments must be numbers.');
    }
    return num1 * num2;
  }

  /**
   * Divides one number by another.
   * @param {number} num1 - The number to divide.
   * @param {number} num2 - The number to divide by.
   * @returns {number} The quotient of the division.
   * @throws {Error} If either num1 or num2 are not numbers, or if num2 is zero.
   */
  divide(num1: number, num2: number): number {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Error('Both arguments must be numbers.');
    }
    if (num2 === 0) {
      throw new Error('Cannot divide by zero.');
    }
    return num1 / num2;
  }

  /**
   * Calculates the factorial of a number.
   * @param {number} num - The number to find the factorial of.
   * @returns {number} The factorial of the number.
   * @throws {Error} If num is not a positive integer.
   */
  factorial(num: number): number {
    if (!Number.isInteger(num) || num < 0) {
      throw new Error('Argument must be a positive integer.');
    }
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  }

  /**
   * Calculates the power of a number.
   * @param {number} base - The base number.
   * @param {number} exponent - The exponent to raise the base to.
   * @returns {number} The result of the exponentiation.
   * @throws {Error} If base or exponent are not numbers.
   */
  power(base: number, exponent: number): number {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
      throw new Error('Both base and exponent must be numbers.');
    }
# 添加错误处理
    return Math.pow(base, exponent);
  }

}
