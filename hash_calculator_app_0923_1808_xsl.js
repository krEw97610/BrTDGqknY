// 代码生成时间: 2025-09-23 18:08:19
import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-hash-calculator',
  templateUrl: './hash_calculator_app.component.html',
  styleUrls: ['./hash_calculator_app.component.css']
})
export class HashCalculatorAppComponent {
  // 输入的字符串
  inputText: string = '';
  // 显示的哈希值
  hashValue: string = '';

  // 计算哈希值
  calculateHash(): void {
    try {
      // 使用CryptoJS库计算SHA-256哈希
      this.hashValue = CryptoJS.SHA256(this.inputText).toString();
    } catch (error) {
      console.error('Error calculating hash:', error);
      // 可以在这里处理错误，例如显示错误消息
      this.hashValue = 'Error calculating hash.';
    }
  }

  // 清除输入和哈希值
  clearInput(): void {
    this.inputText = '';
    this.hashValue = '';
  }

  // 构造函数
  constructor() {
    // 构造函数内可以初始化任何需要的值
  }
}


// HTML模板
export const template = `
<div class="hash-calculator">
  <h2>哈希值计算工具</h2>
  <input type="text" [(ngModel)]="inputText" placeholder="输入字符串..."/>
  <button (click)="calculateHash()">计算哈希值</button>
  <p>哈希值: {{hashValue}}</p>
  <button (click)="clearInput()">清除</button>
</div>`;