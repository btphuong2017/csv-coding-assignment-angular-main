import { Task } from '@/interfaces/task';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

type TaskParams = Omit<Task, 'id' | 'status' | 'assignee'>;

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task;
  loading: boolean;

  formGroup: FormGroup;


  constructor(
    private ref: NzModalRef
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.task?.name ?? '', [Validators.required]),
      description: new FormControl(this.task?.description ?? '', [Validators.required])
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.ref.updateConfig({
        nzOkDisabled: this.formGroup.invalid
      })
    });
    this.formGroup.updateValueAndValidity();
  }

  onSubmit() {
    if(this.formGroup.invalid) return;
    
    this.ref.triggerOk();
    return false;
  }

}
