import { TaskStatus } from '@/enums/task';
import { User } from '@/interfaces/user';
import { TaskService } from '@/services/task.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
  @Output() onSubmit: EventEmitter<unknown> = new EventEmitter();
  users: User[];
  statuses: any[] = Object.entries(TaskStatus).splice(0, Object.entries(TaskStatus).length / 2).map(([key, value]) => ({ id: parseInt(key), name: value }));

  formGroup: FormGroup;
  constructor(
    private _task: TaskService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      status: new FormControl(''),
      assignee: new FormControl(''),
    })
  }

  initData() {
    this._task.users().subscribe((res: User[]) => {
      this.users = res;
    }, error => {
      this.users = [];
    })
  }

  submitFilter() {
    this.onSubmit.emit(this.formGroup.value);
  }

  resetFilter() {
    this.formGroup.reset();
    this.submitFilter();
  }

}
