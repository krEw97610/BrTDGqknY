// 代码生成时间: 2025-08-02 18:46:49
 * 使用方法:
 * 1. 创建 NotificationService 的实例
 * 2. 调用 addNotification 方法添加新通知
 * 3. 调用 clearNotifications 方法移除所有通知
 */

// 导入 Angular 核心模块
import { Injectable } from '@angular/core';

// 定义 NotificationService 类
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // 用于存储通知消息的数组
  private notifications: string[] = [];

  // 构造函数
  constructor() {}

  /*
   * addNotification - 添加一个新通知消息
   *
   * 参数：
   * message: string - 要添加的通知消息
   */
  addNotification(message: string): void {
    // 检查 message 是否为非空字符串
    if (typeof message !== 'string' || message.trim() === '') {
      throw new Error('Invalid notification message');
    }
    // 将消息添加到通知数组中
    this.notifications.push(message);
  }

  /*
   * clearNotifications - 移除所有通知消息
   */
  clearNotifications(): void {
    // 清空通知数组
    this.notifications = [];
  }

  /*
   * getNotifications - 获取所有通知消息
   */
  getNotifications(): string[] {
    // 返回通知数组的副本以避免外部修改
    return [...this.notifications];
  }
}
