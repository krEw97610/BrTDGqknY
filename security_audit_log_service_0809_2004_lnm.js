// 代码生成时间: 2025-08-09 20:04:39
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityAuditLogService {

  private auditLogUrl: string = 'http://localhost:3000/api/audit-logs';

  constructor(private http: HttpClient) {}

  /**
   * Logs a new security event to the audit log.
   *
   * @param {Object} event The security event to be logged.
   * @returns {Observable<any>} The result of the HTTP request.
   */
  logSecurityEvent(event: Object): any {
    try {
      return this.http.post(this.auditLogUrl, event).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      console.error('Error logging security event:', error);
      // Handle error or rethrow depending on application requirements
      throw error;
    }
  }

  /**
   * Handles HTTP errors.
   *
   * @private
   * @param {Error} error The error caught by the catchError operator.
   * @returns {Observable<never>} An empty Observable to stop the execution of further operators.
   */
  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}"`
      );
    }
    // Return an observable with a user-facing error message.
    return of('Something bad happened; please try again later.');
  }
}
