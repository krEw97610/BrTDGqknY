// 代码生成时间: 2025-08-03 03:23:22
 * Features:
 * - Timers setup using a simple configuration interface.
 * - Task execution tracking with error handling.
 * - Scalable and maintainable code structure.
 */

import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TaskService } from './task.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnDestroy {
  // Interval subscription
  private intervalSubscription: Subscription;
  // Tasks array to keep track of scheduled tasks
  tasks: Array<{ name: string; interval: number }> = [];

  constructor(private taskService: TaskService) {}

  // Schedules a new task
  addTask(name: string, interval: number): void {
    const task = { name, interval };
    this.tasks.push(task);
    this.scheduleTask(task);
  }

  // Schedules the task to run at the specified interval
  private scheduleTask(task: { name: string; interval: number }): void {
    this.intervalSubscription = setInterval(() => {
      this.runTask(task.name);
    }, task.interval);
  }

  // Runs the task and handles errors
  private runTask(taskId: string): void {
    try {
      this.taskService.executeTask(taskId).subscribe({
        next: (result) => console.log(`Task ${taskId} executed: `, result),
        error: (error) => console.error(`Error executing task ${taskId}: `, error),
      });
    } catch (error) {
      console.error(`Error executing task ${taskId}: `, error);
    }
  }

  // Stops all tasks when the component is destroyed
  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      clearInterval(this.intervalSubscription);
    }
  }
}

/*
 * TaskService.js - Service responsible for executing tasks.
 *
 * Features:
 * - Task execution logic.
 * - Error handling and logging.
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // Simulate task execution with a delay
  executeTask(taskId: string): any {
    return of(`Task ${taskId} executed successfully`).pipe(
      debounceTime(1000), // Simulate a delay of 1 second
      catchError((error) => {
        console.error(`Error executing task ${taskId}: `, error);
        return of(`Task ${taskId} failed`);
      })
    );
  }
}
