// 代码生成时间: 2025-09-08 22:03:48
import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-responsive-layout',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Responsive Layout</span>
    </mat-toolbar>

    <mat-sidenav-container class="example-container">
      <mat-sidenav #sidenav mode="over">
        <!-- Sidenav content here -->
      </mat-sidenav>
      <mat-sidenav-content>
        <!-- Main content here -->
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    '.example-container {
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
    }',
    'mat-sidenav {
      padding: 20px;
    }'
  ]
})
export class ResponsiveLayoutAppComponent implements OnInit {
  isHandset: boolean | undefined;

  constructor(private media: MediaMatcher) {}

  ngOnInit(): void {
    this.media.asObservable()
      .subscribe((change: MediaQueryListEvent) => {
        this.isHandset = change.matches;
      });
  }

  /**
   * Toggles the sidenav open and closed.
   */
  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
