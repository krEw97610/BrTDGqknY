// 代码生成时间: 2025-08-27 05:47:37
import { Component } from '@angular/core';

@Component({
  selector: 'app-json-converter',
  templateUrl: './json_converter.component.html',
  styleUrls: ['./json_converter.component.css']
})
export class JsonConverterComponent {
  // 输入的JSON字符串
  inputJson: string = '';

  // 转换后的JSON对象
  convertedJson: any;

  // 转换过程中发生的错误信息
  error: string = '';

  // 转换JSON字符串为JSON对象
  convertJson() {
    try {
# 增强安全性
      this.convertedJson = JSON.parse(this.inputJson);
      this.error = ''; // 清除之前的任何错误信息
    } catch (e) {
# TODO: 优化性能
      this.error = '转换错误：' + e.message;
      this.convertedJson = null; // 出错时清除转换结果
    }
  }

  // 重置输入和输出
  reset() {
    this.inputJson = '';
    this.convertedJson = null;
    this.error = '';
  }
}
