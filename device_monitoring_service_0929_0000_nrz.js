// 代码生成时间: 2025-09-29 00:00:59
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// DeviceService is responsible for fetching device status information from an API
@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private deviceStatusUrl = '/api/device/status'; // URL to web api

  constructor(private http: HttpClient) { }

  // Get the device status information
  getDeviceStatus(): Observable<any> {
    return this.http.get<any>(this.deviceStatusUrl)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  // Handle Http operation that failed
  // This method can be called to handle any HttpError
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an user-facing error
    return throwError('Something bad happened; please try again later.');
  }
}

// DeviceComponent is the UI component to display device status
import { Component, OnInit } from '@angular/core';
import { DeviceService } from './device_monitoring_service';

@Component({
  selector: 'app-device-monitor',
  template: `
    <div *ngIf="deviceStatus">
      <h3>Device Status: {{ deviceStatus }}</h3>
    </div>
    <div *ngIf="error">
      <h3>Error: {{ error }}</h3>
    </div>
  `,
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  deviceStatus: any;
  error: any;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getDeviceStatus();
  }

  getDeviceStatus(): void {
    this.deviceService.getDeviceStatus().subscribe({
      next: (data) => {
        this.deviceStatus = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
        this.deviceStatus = null;
      }
    });
  }
}
