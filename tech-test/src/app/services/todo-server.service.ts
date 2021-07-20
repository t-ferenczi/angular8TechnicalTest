import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoServerService {

  server = 'http://localhost:3000';
  lastTaskId: number = 0;
  constructor(
    private httpClient: HttpClient
  ) { }


  getList(): Observable<Task[]> {
    console.log('todoserver getlist');
    return this.httpClient.get<Task[]>(`${this.server}/tasks`)
      .pipe(tap(
        response => this.lastTaskId = Math.max(...response.map(resp => resp.id))
      ));
  }

  getTask(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.server}/tasks/${taskId}`)
    .pipe(catchError(
      err => of(new Task({}))
    ));
  }

  createTask(task: Task) {
    return this.httpClient.post(`${this.server}/tasks`, task);
  }

  updateTask(task: Task) {
    return this.httpClient.patch(`${this.server}/tasks/${task.id}`, task);
  }

  deleteTask(taskId: number) {
    return this.httpClient.delete(`${this.server}/tasks/${taskId}`);
  }

  getAvailableTaskId() {
    return this.lastTaskId + 1;
  }
}
