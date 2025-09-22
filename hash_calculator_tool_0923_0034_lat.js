// 代码生成时间: 2025-09-23 00:34:27
import { Component } from '@angular/core';

@Component({
  selector: 'app-hash-calculator',
  templateUrl: './hash_calculator.component.html',
  styleUrls: ['./hash_calculator.component.css']
})
export class HashCalculatorComponent {

  // 输入文本
  private inputText: string = '';
  // 哈希值结果
  private hashResult: string = '';
  // 哈希算法类型
  private hashAlgorithm: 'sha256' | 'md5' | 'sha512' = 'sha256';

  constructor() {
    // 构造函数，初始化组件
  }

  // 获取哈希值
  calculateHash(): void {
    try {
      // 使用crypto-js库计算哈希值
      const hash = CryptoJS[this.hashAlgorithm](this.inputText);
      this.hashResult = hash.toString(CryptoJS.enc.Hex);
    } catch (error) {
      // 错误处理
      console.error('Error calculating hash:', error);
      this.hashResult = 'Error calculating hash';
    }
  }

  // 改变哈希算法
  changeAlgorithm(algorithm: 'sha256' | 'md5' | 'sha512'): void {
    this.hashAlgorithm = algorithm;
    // 重新计算哈希值
    this.calculateHash();
  }

  // 清空输入文本和哈希结果
  clearInputs(): void {
    this.inputText = '';
    this.hashResult = '';
  }

}

/*
 * 组件HTML模板（hash_calculator.component.html）
 * <div>
 *   <input type="text" [(ngModel)]="inputText" placeholder="Enter text to hash">
 *   <select [(ngModel)]="hashAlgorithm" (change)="changeAlgorithm(hashAlgorithm)">
 *     <option value="sha256">SHA-256</option>
 *     <option value="md5">MD5</option>
 *     <option value="sha512">SHA-512</option>
 *   </select>
 *   <button (click)="calculateHash()">Calculate Hash</button>
 *   <button (click)="clearInputs()">Clear</button>
 *   <p>Hash: {{ hashResult }}</p>
 * </div>
 *
 * 组件CSS样式（hash_calculator.component.css）
 * .hash-calculator {
 *   /* 样式定义 */
 * }
 *
 * 注意：crypto-js库需要先安装：npm install crypto-js
 *