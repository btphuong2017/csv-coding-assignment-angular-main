import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '@/interfaces/user';
import { Task, TaskListParams } from '@/interfaces/task';
import { TaskStatus } from '@/enums/task';

function randomDelay() {
  return Math.random() * 1000;
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  storedUsers: User[] = [
    { id: 111, name: "Mike", avatar: 'https://placehold.co/40x40?text=M' },
    { id: 222, name: "James", avatar: 'https://placehold.co/40x40?text=J' }
  ];

  storedTasks: Task[] = [
    {
      id: 0,
      name: "Install a monitor arm",
      description: "Install a monitor arm",
      // assignee: this.storedUsers[0],
      assignee: null,
      status: 1
    },
    {
      id: 1,
      name: "Move the desk to the new location",
      description: "Move the desk to the new location",
      assignee: this.storedUsers[1],
      status: 1
    }
  ];

  lastId = 1;

  private findTaskById = id =>
    this.storedTasks.find(task => task.id === +id);

  private findUserById = id => this.storedUsers.find(user => user.id === +id);

  private filterTasks = (params: TaskListParams) => {
    return this.storedTasks.filter(task => {
      if(params.name && !task.name.includes(params.name)) {
        return false;
      }
      if(params.status && task.status !== +params.status) {
        return false;
      }
      if(params.assignee && task.assignee?.id !== +params.assignee) {
        return false;
      }
      return true;
    });
  };

  tasks(filterParams: TaskListParams = {}) {
    return of(this.filterTasks(filterParams)).pipe(delay(randomDelay()));
  }

  task(id: number): Observable<Task> {
    return of(this.findTaskById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTask(payload: { name: string, description: string }) {
    const newTask: Task = {
      id: ++this.lastId,
      name: payload.name,
      description: payload.description,
      assignee: null,
      status: TaskStatus.NEW
    };

    this.storedTasks = this.storedTasks.concat(newTask);

    return of(newTask).pipe(delay(randomDelay()));
  }

  assign(taskId: number, userId: number) {
    return this.update(taskId, { assignee: this.storedUsers.find(u => u.id === userId) });
  }

  updateStatus(taskId: number, status: TaskStatus) {
    return this.update(taskId, { status });
  }

  update(taskId: number, updates: Partial<Omit<Task, "id">>) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = { ...foundTask, ...updates };

    this.storedTasks = this.storedTasks.map(t =>
      t.id === taskId ? updatedTask : t
    );

    return of(updatedTask).pipe(delay(randomDelay()));
  }

  delete(taskId: number) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    this.storedTasks = this.storedTasks.filter(t => t.id !== taskId);

    return of({}).pipe(delay(randomDelay()));
  }
}
