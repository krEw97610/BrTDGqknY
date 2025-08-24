// 代码生成时间: 2025-08-24 17:30:03
class SortingService {
  /*
   * Sorts an array using the Bubble Sort algorithm
   *
   * @param {Array} array - The array to be sorted
   * @returns {Array} The sorted array
   */
  bubbleSort(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }

    let len = array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          // Swap elements
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
  }

  /*
   * Sorts an array using the Quick Sort algorithm
   *
   * @param {Array} array - The array to be sorted
   * @returns {Array} The sorted array
   */
  quickSort(array) {
    if (!Array.isArray(array) || array.length <= 1) {
      return array;
    }

    let left = [], right = [], middle = [];
    let pivot = array[0];

    for (let i = 1; i < array.length; i++) {
      if (array[i] < pivot) {
        left.push(array[i]);
      } else if (array[i] > pivot) {
        right.push(array[i]);
      } else {
        middle.push(array[i]);
      }
    }

    return this.quickSort(left).concat(middle, this.quickSort(right));
  }

  /*
   * Sorts an array using the Insertion Sort algorithm
   *
   * @param {Array} array - The array to be sorted
   * @returns {Array} The sorted array
   */
  insertionSort(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }

    for (let i = 1; i < array.length; i++) {
      let key = array[i], j = i - 1;

      /* Move elements of array[0..i-1], that are greater than key,
       * to one position ahead of their current position
       */
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = key;
    }
    return array;
  }
}

// Provide the service for Angular
angular.module('sortingApp')
  .service('SortingService', SortingService);
