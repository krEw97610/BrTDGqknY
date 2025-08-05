// 代码生成时间: 2025-08-05 21:54:47
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// 用户身份认证服务
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://api.example.com/login';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  // 构造函数
  constructor(private http: HttpClient) {}

  // 用户登录方法
  login(username: string, password: string): Observable<any> {
    const credentials = {
      username: username,
      password: password
    };
    // 发送POST请求到服务器验证用户身份
    return this.http.post(this.loginUrl, JSON.stringify(credentials), { headers: this.headers })
      .pipe(
        // 重试策略
        retry(3),
        // 错误处理
        catchError(this.handleError)
      );
  }

  // 注销方法
  logout(): void {
    // 清除本地存储的用户信息
    localStorage.removeItem('user');
  }

  // 用户是否已登录
  isLoggedIn(): boolean {
    // 检查本地存储中是否有用户信息
    return !!localStorage.getItem('user');
  }

  // 私有方法，处理HTTP错误
  private handleError(error: any) {
    // 客户端错误处理（如：网络问题等）
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      // 服务器端错误处理
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
