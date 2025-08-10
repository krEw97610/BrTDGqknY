// 代码生成时间: 2025-08-11 03:56:30
import { Injectable } from '@angular/core';

/**
 * CacheService - A service for caching data in an Angular application.
 * This service uses a simple in-memory object to store cached data.
 */
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Record<string, any> = {};

  /**
   * Store data in the cache with a given key.
   * @param key The key for the cached data.
   * @param data The data to be cached.
   */
  setCache(key: string, data: any): void {
    this.cache[key] = data;
  }

  /**
   * Retrieve data from the cache with a given key.
   * @param key The key for the cached data.
   * @returns The cached data if found, otherwise null.
   */
  getCache(key: string): any {
    return this.cache[key] || null;
  }

  /**
   * Check if data is cached with a given key.
   * @param key The key for the cached data.
   * @returns True if data is cached, otherwise false.
   */
  isCached(key: string): boolean {
    return key in this.cache;
  }

  /**
   * Remove data from the cache with a given key.
   * @param key The key for the cached data.
   */
  clearCache(key: string): void {
    delete this.cache[key];
  }

  /**
   * Clear all data from the cache.
   */
  clearAllCache(): void {
    this.cache = {};
  }
}
