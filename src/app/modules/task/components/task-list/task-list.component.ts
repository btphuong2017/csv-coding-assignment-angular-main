import { TaskStatus } from '@/enums/task';
import { Task, TaskListParams } from '@/interfaces/task';
import { User } from '@/interfaces/user';
import { TaskService } from '@/services/task.service';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  loading: boolean = false;
  tasks: Task[];
  users: User[];
  modalRef: NzModalRef<TaskFormComponent>;
  filterParams: TaskListParams = {};

  constructor(
    private _task: TaskService,
    private _modal: NzModalService,
    private _router: Router,
    private _notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
  }

  getUsers() {
    this._task.users().subscribe((res: User[]) => {
      this.users = res;
    }, error => {
      this.users = [];
      this._notification.error('Error', error.message);
    })
  }

  getTasks(filterParams: TaskListParams = {}) {
    this.loading = true;

    this.filterParams = {
      ...this.filterParams,
      ...filterParams
    }

    this._task.tasks(this.filterParams).subscribe((res: Task[]) => {
      this.tasks = res;
    }, error => {
      this.tasks = [];
      this._notification.error('Error', error.message);
    }).add(() => this.loading = false);
  }

  onDetail(task: Task) {
    this._router.navigate(['/tasks', task.id]);
  }

  onEdit(task: Task) {
    this.modalRef = this._modal.create({
      nzTitle: "Update task " + task.name,
      nzContent: TaskFormComponent,
      nzCancelText: "Cancel",
      nzOkText: "Save Changes",
      nzOkLoading: this.modalRef?.componentInstance?.loading,
      nzOkDisabled: this.modalRef?.componentInstance?.formGroup?.invalid,
      nzComponentParams: {
        task: task
      },
      nzOnOk: (component: TaskFormComponent) => {
        this.modalRef.updateConfig({ nzOkLoading: true });
        const data = component.formGroup.value;
        this._task.update(task.id, data).subscribe(task => {
          this.getTasks();
          this.modalRef.close();
        }, error => {
          this._notification.error('Error', error.message);
        }).add(() => {
          this.modalRef.updateConfig({ nzOkLoading: false })
        })
        return false;
      }
    });
  }

  onDelete(task: Task) {
    this._task.delete(task.id).subscribe(() => {
      this.getTasks();
    }, error => {
      this._notification.error('Error', error.message);
    })
  }
}
