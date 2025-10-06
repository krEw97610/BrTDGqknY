// 代码生成时间: 2025-10-07 03:40:24
import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';

/**
 * XML数据解析器服务
 * 该服务利用xml2js库将XML字符串解析为JSON对象
 */
@Injectable({
  providedIn: 'root',
})
export class XmlParserService {
  
  /**
   * 将XML字符串解析为JSON对象
   * @param xmlString XML字符串
   * @returns Promise对象，解析成功返回JSON对象，失败返回错误信息
   */
  parseXml(xmlString: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // 使用xml2js解析XML
      const parser = new xml2js.Parser();
      
      parser.parseString(xmlString, (err, result) => {
        if (err) {
          // 错误处理，解析失败
          reject(err);
        } else {
          // 解析成功
          resolve(result);
        }
      });
    });
  }
}

/**
 * XML数据解析器组件
 * 该组件提供了一个输入框用于输入XML字符串，并显示解析结果
 */
import { Component } from '@angular/core';
import { XmlParserService } from './xml_parser_service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-xml-parser',
  template: `
    <form #xmlForm="ngForm" (ngSubmit)="parseXml(xmlForm.value.xmlData)">
      <label for="xmlData">输入XML字符串:</label>
      <textarea id="xmlData" name="xmlData" rows="10" cols="50" ngModel required></textarea>
      <button type="submit">解析</button>
      <div *ngIf="parseResult !== null">
        <h3>解析结果:</h3>
        <pre>{{ parseResult | json }}</pre>
      </div>
    </form>
  `,
})
export class XmlParserComponent {
  xmlData: string;
  parseResult: any;
  
  /**
   * 构造函数
   */
  constructor(private xmlParserService: XmlParserService) { }
  
  /**
   * 解析XML字符串
   * @param formData 表单数据
   */
  parseXml(formData: NgForm): void {
    if (formData.valid) {
      this.xmlParserService.parseXml(formData.value.xmlData)
        .then(result => {
          this.parseResult = result;
        })
        .catch(err => {
          this.parseResult = '解析错误: ' + err.message;
        });
    }
  }
}
