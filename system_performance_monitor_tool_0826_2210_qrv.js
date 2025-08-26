// 代码生成时间: 2025-08-26 22:10:19
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Injectable Service to handle system performance monitoring
@Injectable({
  providedIn: 'root'
})
export class SystemPerformanceMonitorService {
  private systemMetricsUrl = '/api/system/metrics';
  private errorHandling = (error: any) => {
    // Handle errors gracefully
    console.error('Error fetching system metrics:', error);
    return throwError(error.message || error);
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches CPU usage data from the server
   *
   * @returns {Observable<any>} An observable of CPU usage data
   */
  getCpuUsage(): Observable<any> {
    return this.http.get(this.systemMetricsUrl + '/cpu').pipe(
      catchError(this.errorHandling)
    );
  }

  /**
   * Fetches memory usage data from the server
   *
   * @returns {Observable<any>} An observable of memory usage data
   */
  getMemoryUsage(): Observable<any> {
    return this.http.get(this.systemMetricsUrl + '/memory').pipe(
      catchError(this.errorHandling)
    );
  }

  /**
   * Fetches network usage data from the server
   *
   * @returns {Observable<any>} An observable of network usage data
   */
  getNetworkUsage(): Observable<any> {
    return this.http.get(this.systemMetricsUrl + '/network').pipe(
      catchError(this.errorHandling)
    );
  }
}


// Component to display system performance data
import { Component, OnInit } from '@angular/core';
import { SystemPerformanceMonitorService } from './system_performance_monitor_tool';

@Component({
  selector: 'app-system-performance-monitor',
  templateUrl: './system_performance_monitor.component.html',
  styleUrls: ['./system_performance_monitor.component.css']
})
export class SystemPerformanceMonitorComponent implements OnInit {
  constructor(private monitorService: SystemPerformanceMonitorService) {
  }

  ngOnInit(): void {
    this.fetchSystemMetrics();
  }

  /**
   * Fetches and displays system performance metrics
   */
  fetchSystemMetrics(): void {
    this.monitorService.getCpuUsage().subscribe(cpuData => {
      console.log('CPU Usage:', cpuData);
      // Display CPU data in the UI
    }, error => console.error('Failed to fetch CPU usage:', error));

    this.monitorService.getMemoryUsage().subscribe(memoryData => {
      console.log('Memory Usage:', memoryData);
      // Display memory data in the UI
    }, error => console.error('Failed to fetch memory usage:', error));

    this.monitorService.getNetworkUsage().subscribe(networkData => {
      console.log('Network Usage:', networkData);
      // Display network data in the UI
    }, error => console.error('Failed to fetch network usage:', error));
  }
}
