import { TaskService } from '@/services/task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {
  @ViewChild('taskList') taskList: TaskListComponent;
  modalRef: NzModalRef<TaskFormComponent>;

  constructor(
    private _modal: NzModalService,
    private _task: TaskService
  ) { }

  ngOnInit(): void {
  }

  onCreate() {
    this.modalRef = this._modal.create({
      nzTitle: "Create new task",
      nzContent: TaskFormComponent,
      nzCancelText: "Cancel",
      nzOkText: "Create",
      nzOkLoading: this.modalRef?.componentInstance?.loading,
      nzOkDisabled: this.modalRef?.componentInstance?.formGroup?.invalid,
      nzOnOk: (component: TaskFormComponent) => {
        this.modalRef.updateConfig({ nzOkLoading: true });
        const data = component.formGroup.value;
        this._task.newTask(data).subscribe(task => {
          this.taskList.getTasks();
          this.modalRef.close();
        }).add(() => {
          this.modalRef.updateConfig({ nzOkLoading: false })
        })
        return false;
      }
    });
  }

}
