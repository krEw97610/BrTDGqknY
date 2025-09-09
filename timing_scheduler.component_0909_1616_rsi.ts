// 代码生成时间: 2025-09-09 16:16:05
import { Component, OnInit } from '@angular/core';
import { SchedulerService } from './scheduler.service';
import { Task } from './task.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-timing-scheduler',
  templateUrl: './timing_scheduler.component.html',
  styleUrls: ['./timing_scheduler.component.css']
})
export class TimingSchedulerComponent implements OnInit {
  /*
   * Holds the current task being edited.
   * Initialize as null for a new task.
   */
  currentTask: Task = null;

  /*
   * Holds the list of all tasks.
   */
  tasks: Task[] = [];

  /*
   * Injects the SchedulerService.
   */
  constructor(private schedulerService: SchedulerService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /*
   * Loads tasks from the SchedulerService.
   */
  loadTasks(): void {
    this.schedulerService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  /*
   * Adds a new task or updates an existing one.
   */
  addOrUpdateTask(form: NgForm): void {
    if (form.invalid) {
      console.error('Form is invalid. Cannot add or update task.');
      return;
    }

    const task: Task = {
      id: this.currentTask ? this.currentTask.id : null,
      description: form.value.description,
      scheduledTime: form.value.scheduledTime
    };

    this.schedulerService.addOrUpdateTask(task).subscribe(
      () => {
        this.loadTasks();
        this.resetForm(form);
      },
      (error) => {
        console.error('Error adding or updating task:', error);
      }
    );
  }

  /*
   * Resets the form after a task has been added or updated.
   */
  resetForm(form: NgForm): void {
    form.reset();
    this.currentTask = null;
  }

  /*
   * Marks a task as deleted.
   */
  deleteTask(task: Task): void {
    this.schedulerService.deleteTask(task.id).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  /*
   * Prepares the form for editing an existing task.
   */
  editTask(task: Task): void {
    this.currentTask = task;
  }
}

/*
 * task.model.ts - Data model for a task
 */
export interface Task {
  id?: number;
  description: string;
  scheduledTime: string;
}

/*
 * scheduler.service.ts - Service for managing tasks
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private apiUrl = 'api/tasks'; // URL to web API

  constructor(private http: HttpClient) {}

  /*
   * Gets a list of tasks from the server.
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /*
   * Adds a new task or updates an existing one.
   */
  addOrUpdateTask(task: Task): Observable<any> {
    const url = `${this.apiUrl}/${task.id ? 'update' : 'add'}`;
    return this.http.post(url, task).pipe(
      catchError(this.handleError)
    );
  }

  /*
   * Deletes a task from the server.
   */
  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.post(url, {}).pipe(
      catchError(this.handleError)
    );
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
