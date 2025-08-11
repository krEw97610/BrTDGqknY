// 代码生成时间: 2025-08-11 14:56:06
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { AppComponent } from './app.component';
import { ChartService } from './chart.service';
import { ChartComponent } from './chart.component';

// InteractiveChartGeneratorModule is the main module for the interactive chart generator app
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    ChartService
  ],
  bootstrap: [AppComponent]
})
export class InteractiveChartGeneratorModule {}

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Interactive Chart Generator</h1>
      <app-chart></app-chart>
    </div>
  `
})
export class AppComponent {
  title = 'Interactive Chart Generator';
}

// chart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private apiUrl = 'https://api.example.com/charts'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Fetch chart data from the API
  getChartData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Handle API errors
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Observable.throw('Something bad happened; please try again later.');
  }
}

// chart.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartService } from './chart.service';

@Component({
  selector: 'app-chart',
  template: `
    <div *ngIf="chartOptions">
      <highcharts-chart [options]="chartOptions"></highcharts-chart>
    </div>
  `
})
export class ChartComponent implements OnInit {
  chartOptions: any; // Highcharts configuration object

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.chartService.getChartData().subscribe(
      (chartData) => {
        this.chartOptions = {
          chart: {
            type: 'line'
          },
          title: { text: 'Interactive Chart' },
          xAxis: {
            categories: chartData.categories
          },
          yAxis: {
            title: { text: 'Values' }
          },
          series: chartData.series
        };
      },
      (error) => {
        console.error('Error loading chart data', error);
      }
    );
  }
}
