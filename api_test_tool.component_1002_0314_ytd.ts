// 代码生成时间: 2025-10-02 03:14:25
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * API测试工具组件
 */
@Component({
  selector: 'app-api-test-tool',
  templateUrl: './api_test_tool.component.html',
  styleUrls: ['./api_test_tool.component.css']
})
export class ApiTestToolComponent {
  // 请求URL
  url = '';
  // 方法类型
  method = 'GET';
  // 请求参数
  parameters = '';
  // 响应结果
  response = '';
  // 错误消息
  errorMessage = '';

  constructor(private http: HttpClient) {}

  /**
   * 发送请求
   */
  sendRequest(): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = { headers: headers };
    
    try {
      switch (this.method) {
        case 'GET':
          this.sendGetRequest();
          break;
        case 'POST':
          this.sendPostRequest(JSON.parse(this.parameters));
          break;
        // 可以根据需要添加更多方法类型的处理
        default:
          this.errorMessage = '不支持的方法类型';
          break;
      }
    } catch (error) {
      this.errorMessage = '请求失败: ' + error.message;
    }
  }

  /**
   * 发送GET请求
   * @returns {Observable<any>}
   */
  sendGetRequest(): void {
    this.http.get(this.url)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(
        data => this.response = JSON.stringify(data, null, 2),
        error => this.errorMessage = error.message
      );
  }

  /**
   * 发送POST请求
   * @param data {any} - 发送的数据
   */
  sendPostRequest(data: any): void {
    this.http.post(this.url, data, options)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(
        data => this.response = JSON.stringify(data, null, 2),
        error => this.errorMessage = error.message
      );
  }

  /**
   * 处理错误
   * @param error {any} - 错误对象
   * @returns {Observable<any>}
   */
  private handleError(error: any): Observable<any> {
    return throwError(error.message || '服务器错误');
  }
}