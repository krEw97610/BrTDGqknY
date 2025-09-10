// 代码生成时间: 2025-09-10 15:58:04
import { Injectable } from '@angular/core';

/**
 * SortingService provides sorting functionality for different algorithms.
 */
@Injectable({
  providedIn: 'root'
})
export class SortingService {

  /**
   * Sorts an array of numbers using the Bubble Sort algorithm.
   *
   * @param {number[]} arr The array of numbers to be sorted.
   * @return {number[]} The sorted array.
   */
  bubbleSort(arr: number[]): number[] {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Invalid input: The array must be non-empty.');
    }

    let len = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
    } while (swapped);

    return arr;
  }

  /**
   * Sorts an array of numbers using the Quick Sort algorithm.
   *
   * @param {number[]} arr The array of numbers to be sorted.
   * @return {number[]} The sorted array.
   */
  quickSort(arr: number[]): number[] {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Invalid input: The array must be non-empty.');
    }

    return this._quickSort(arr, 0, arr.length - 1);
  }

  private _quickSort(arr: number[], low: number, high: number): number[] {
    if (low < high) {
      let pi = this.partition(arr, low, high);
      this._quickSort(arr, low, pi - 1);
      this._quickSort(arr, pi + 1, high);
    }
    return arr;
  }

  private partition(arr: number[], low: number, high: number): number {
    let pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  /**
   * Sorts an array of numbers using the Insertion Sort algorithm.
   *
   * @param {number[]} arr The array of numbers to be sorted.
   * @return {number[]} The sorted array.
   */
  insertionSort(arr: number[]): number[] {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Invalid input: The array must be non-empty.');
    }

    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }

    return arr;
  }
}
