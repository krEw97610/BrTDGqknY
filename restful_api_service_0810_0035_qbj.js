// 代码生成时间: 2025-08-10 00:35:09
 * This Angular service provides RESTful API interface functionality.
 * It includes error handling, comments for clarity, and adheres to best practices.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestfulApiService {
  
  // Base URL for API requests
  private apiUrl = 'https://api.example.com';
  
  constructor(private http: HttpClient) { }
  
  /**
   * Get a list of resources
   * @returns Observable<any>
   */
  getResourceList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resources`).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Get a single resource by ID
   * @param id The ID of the resource
   * @returns Observable<any>
   */
  getResourceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/resources/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Create a new resource
   * @param resource The resource to create
   * @returns Observable<any>
   */
  createResource(resource: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/resources`, resource, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Update an existing resource
   * @param id The ID of the resource
   * @param resource The updated resource
   * @returns Observable<any>
   */
  updateResource(id: number, resource: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/resources/${id}`, resource).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Delete a resource by ID
   * @param id The ID of the resource
   * @returns Observable<any>
   */
  deleteResource(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/resources/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  // Handle HTTP errors
  private handleError(error: any) {
    let errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
