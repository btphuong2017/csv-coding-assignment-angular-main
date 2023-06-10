import { Task } from '@/interfaces/task';
import { User } from '@/interfaces/user';
import { TaskService } from '@/services/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  taskId: number;
  loading: boolean;
  task: Task;
  users: User[];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _task: TaskService,
    private _notification: NzNotificationService,

  ) {
    this._activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.taskId = params.id;
      }
    });
  }

  ngOnInit(): void {
    this.getTask();
    this.getUsers();
  }

  getUsers() {
    this._task.users().subscribe((res: User[]) => {
      this.users = res;
    }, error => {
      this.users = [];
    })
  }

  assign(task: Task, userId: number) {
    this._task.assign(task.id, userId).subscribe((res: Task) => {
      this.getTask();
    })
  }

  getTask() {
    this.loading = true;
    this._task.task(this.taskId).subscribe((res: Task) => {
      if (res) {
        this.task = res;
      } else {
        this._notification.error("Error", "Task not found");
        this._router.navigate(['/tasks']);
      }
    }).add(() => this.loading = false);
  }

  onBack() {
    this._router.navigate(['/tasks']);
  }


}
