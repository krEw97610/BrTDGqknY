// 代码生成时间: 2025-09-07 07:38:58
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InventoryService } from './inventory.service';
import { InventoryListComponent } from './inventory-list.component';
import { InventoryDetailComponent } from './inventory-detail.component';
import { InventoryRoutingModule } from './inventory-routing.module';

/**
 * InventoryManagementSystemModule is the main module of the inventory management system.
 * It includes all the components and services required for the application.
 */
@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    InventoryDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InventoryRoutingModule
  ],
  providers: [
    InventoryService
  ],
  bootstrap: [AppComponent]
})
export class InventoryManagementSystemModule {}

// Additional code for services and components will be placed in their respective files.
