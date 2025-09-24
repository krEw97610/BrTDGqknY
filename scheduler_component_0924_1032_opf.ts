// 代码生成时间: 2025-09-24 10:32:59
 * to run at specific intervals.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit, OnDestroy {
  private intervalId: any;
  private intervalSubscription: Subscription;
  private tasks: Array<{
    task: () => void;
    interval: number;
  }> = [];

  // Add a new task to the scheduler
  addTask(task: () => void, interval: number): void {
    this.tasks.push({ task, interval });
    this.scheduleTask(task, interval);
  }

  // Schedule a single task to run at a specified interval
  private scheduleTask(task: () => void, interval: number): void {
    this.intervalId = setInterval(() => {
      try {
        task();
      } catch (error) {
        console.error('Task execution error:', error);
      }
    }, interval);
  }

  // Start all scheduled tasks
  startAllTasks(): void {
    this.tasks.forEach(({ task, interval }) => {
      this.scheduleTask(task, interval);
    });
  }

  // Stop a single task
  stopTask(task: () => void): void {
    this.tasks = this.tasks.filter(t => t.task !== task);
    clearInterval(this.intervalId);
  }

  // Stop all tasks
  stopAllTasks(): void {
    this.tasks.forEach(({ task }) => {
      this.stopTask(task);
    });
  }

  // OnInit lifecycle hook
  ngOnInit(): void {
    this.startAllTasks();
  }

  // OnDestroy lifecycle hook
  ngOnDestroy(): void {
    this.stopAllTasks();
  }
}
