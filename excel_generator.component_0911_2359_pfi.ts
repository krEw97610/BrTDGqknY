// 代码生成时间: 2025-09-11 23:59:05
 * This component provides a simple interface to create Excel files with various data
 * and configurations. It uses the SheetJS library to handle Excel file generation.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-excel-generator',
  templateUrl: './excel_generator.component.html',
  styleUrls: ['./excel_generator.component.css']
})
export class ExcelGeneratorComponent {
  /**
   * The data to be written into the Excel file.
   */
  public data: any[][];

  /**
   * The configuration for the generated Excel file.
   */
  public config: any;

  /**
   * The Excel file name.
   */
  public fileName: string = 'GeneratedExcelFile';

  constructor() {
    // Initialize with empty data and default configuration
    this.data = [];
    this.config = {};
  }

  /**
   * Generates an Excel file based on the provided data and configuration.
   *
   * @param data - The data to be written into the Excel file.
   * @param config - The configuration for the generated Excel file.
   */
  public generateExcel(data: any[][], config: any): void {
    try {
      this.data = data;
      this.config = config;
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName + '.xlsx');
    } catch (error) {
      console.error('Error generating Excel file:', error);
      // Handle error, e.g., show a user-friendly message
    }
  }

  /**
   * Resets the data and configuration to default values.
   */
  public reset(): void {
    this.data = [];
    this.config = {};
  }
}
