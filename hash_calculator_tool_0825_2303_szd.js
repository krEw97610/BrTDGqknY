// 代码生成时间: 2025-08-25 23:03:33
import { Component } from '@angular/core';

// 组件类，用于哈希值计算工具
@Component({
  selector: 'app-hash-calculator',
  templateUrl: './hash-calculator.component.html',
  styleUrls: ['./hash-calculator.component.css']
})
export class HashCalculatorComponent {
  // 输入值
  inputValue: string = '';
  // 哈希值输出
  hashValue: string = '';
  // 哈希算法列表
  hashAlgorithms: string[] = ['MD5', 'SHA1', 'SHA256', 'SHA512'];
  // 选择的哈希算法
  selectedAlgorithm: string = this.hashAlgorithms[0];

  // 计算哈希值
  calculateHash(): void {
    if (!this.inputValue) {
      alert('请输入要计算的值');
      return;
    }
    try {
      // 使用javascript内置的crypto库计算哈希值
      const hash = crypto.subtle.digest(this.selectedAlgorithm.toLowerCase(), new TextEncoder().encode(this.inputValue))
        .then(buffer => {
          // 将Buffer转换为Base64编码的字符串
          return Array.from(new Uint8Array(buffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
        }).then(hash => {
          this.hashValue = hash;
        });
    } catch (error) {
      console.error('哈希计算错误:', error);
      alert('哈希计算出错');
    }
  }

  // 选择哈希算法
  selectAlgorithm(algorithm: string): void {
    this.selectedAlgorithm = algorithm;
  }
}

// 注意：这段代码假设你在一个支持TypeScript和Angular的环境中运行，
// 并且环境支持Web Crypto API。在实际部署时，你需要确保这些条件被满足。