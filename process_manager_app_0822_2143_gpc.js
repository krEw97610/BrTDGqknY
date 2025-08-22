// 代码生成时间: 2025-08-22 21:43:55
// Import necessary Angular core modules
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Define the ProcessManagerComponent
@Component({
  selector: 'app-process-manager',
  templateUrl: './process-manager.component.html',
  styleUrls: ['./process-manager.component.css']
})
export class ProcessManagerComponent {
  // Component properties
  processes: any[] = [];
  selectedProcess: any;

  // Constructor with injected HttpClient
  constructor(private http: HttpClient) { }

  // Method to fetch processes
  fetchProcesses(): void {
    this.http.get('/api/processes').subscribe(
      data => {
        this.processes = data;
      },
      error => {
        console.error('There was an error fetching processes', error);
      }
    );
  }

  // Method to select a process
  selectProcess(process): void {
    this.selectedProcess = process;
  }

  // Method to start a process
  startProcess(process): void {
    // Implement the logic to start a process
  }

  // Method to stop a process
  stopProcess(process): void {
    // Implement the logic to stop a process
  }
}

// Define the AppModule
@NgModule({
  declarations: [
    ProcessManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ProcessManagerComponent]
})
export class AppModule { }

// Bootstrap the application
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);