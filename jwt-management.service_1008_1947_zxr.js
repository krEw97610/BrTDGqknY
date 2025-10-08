// 代码生成时间: 2025-10-08 19:47:01
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // 引入环境变量文件

// 定义JWT管理服务
@Injectable({
  providedIn: 'root'
})
export class JwtManagementService {
  private authUrl = `${environment.apiUrl}/token`; // API URL for obtaining JWT token

  constructor(private http: HttpClient) {}

  // 获取JWT令牌的方法
  getToken(): Observable<any> {
    return this.http.post<any>(this.authUrl, {
      grant_type: 'password',
      username: environment.username,
      password: environment.password
    }).pipe(
      catchError(this.handleError)
    );
  }

  // 刷新JWT令牌的方法
  refreshToken(token: string): Observable<any> {
    return this.http.post<any>(this.authUrl, {
      grant_type: 'refresh_token',
      refresh_token: token
    }).pipe(
      catchError(this.handleError)
    );
  }

  // 处理API错误的方法
  private handleError(error: any) {
    return throwError(error.message || 'Server error');
  }
}

// JWT拦截器，用于自动添加JWT令牌
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtManagementService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.jwtService.getToken().subscribe(
      (token) => {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token.access_token)
        });
        return next.handle(authReq);
      },
      (error) => {
        console.error('Error in the interceptor: ', error);
        return next.handle(req); // 继续处理请求，尽管没有JWT令牌
      }
    );
  }
}

// 环境变量文件，用于存储API URL和凭据
export const environment = {
  production: false,
  apiUrl: 'https://api.example.com',
  username: 'your_username',
  password: 'your_password'
};