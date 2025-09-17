// 代码生成时间: 2025-09-17 18:01:51
import { Injectable } from '@angular/core';

/**
 * SortingService provides sorting functionalities.
 * It's designed to be easily maintainable and extendable,
 * following best practices and Angular conventions.
 */
@Injectable({
  providedIn: 'root'
# TODO: 优化性能
})
export class SortingService {

  constructor() {}
# 添加错误处理

  /**
   * Sorts an array of numbers using bubble sort algorithm.
# NOTE: 重要实现细节
   * @param {number[]} array - The array of numbers to be sorted.
   * @returns {number[]} - The sorted array.
   */
# NOTE: 重要实现细节
  bubbleSort(array: number[]): number[] {
    if (!Array.isArray(array) || array.length <= 1) {
      throw new Error('Input must be an array of numbers with more than one element.');
    }

    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
# 优化算法效率
      for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
# NOTE: 重要实现细节
        }
      }
    }
    return array;
# NOTE: 重要实现细节
  }

  /**
   * Sorts an array of numbers using quick sort algorithm.
   * @param {number[]} array - The array of numbers to be sorted.
# 优化算法效率
   * @returns {number[]} - The sorted array.
   */
# FIXME: 处理边界情况
  quickSort(array: number[]): number[] {
    if (!Array.isArray(array) || array.length <= 1) {
      throw new Error('Input must be an array of numbers with more than one element.');
    }
# 优化算法效率

    return this._quickSortHelper(array, 0, array.length - 1);
  }

  private _quickSortHelper(array: number[], low: number, high: number): number[] {
    if (low < high) {
      let pi = this._partition(array, low, high);
      this._quickSortHelper(array, low, pi - 1);
      this._quickSortHelper(array, pi + 1, high);
    }
# NOTE: 重要实现细节
    return array;
  }

  private _partition(array: number[], low: number, high: number): number {
# TODO: 优化性能
    let pivot = array[high];
    let i = (low - 1);
    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        let temp = array[i];
# 添加错误处理
        array[i] = array[j];
# 改进用户体验
        array[j] = temp;
      }
    }
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    return i + 1;
  }

  /**
# 扩展功能模块
   * Sorts an array using insertion sort algorithm.
   * @param {number[]} array - The array of numbers to be sorted.
# 改进用户体验
   * @returns {number[]} - The sorted array.
# 添加错误处理
   */
  insertionSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array of numbers.');
    }

    for (let i = 1; i < array.length; i++) {
      let key = array[i];
# NOTE: 重要实现细节
      let j = i - 1;
# FIXME: 处理边界情况

      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = key;
    }
# 优化算法效率
    return array;
  }

  /**
   * Sorts an array using selection sort algorithm.
   * @param {number[]} array - The array of numbers to be sorted.
   * @returns {number[]} - The sorted array.
# 优化算法效率
   */
  selectionSort(array: number[]): number[] {
    if (!Array.isArray(array) || array.length <= 1) {
      throw new Error('Input must be an array of numbers with more than one element.');
# 扩展功能模块
    }

    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
# FIXME: 处理边界情况
      }
      if (minIdx !== i) {
        let temp = array[minIdx];
        array[minIdx] = array[i];
        array[i] = temp;
      }
# 优化算法效率
    }
    return array;
  }
}
