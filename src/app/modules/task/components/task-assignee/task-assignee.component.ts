import { Task } from '@/interfaces/task';
import { User } from '@/interfaces/user';
import { TaskService } from '@/services/task.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-task-assignee',
  templateUrl: './task-assignee.component.html',
  styleUrls: ['./task-assignee.component.scss']
})
export class TaskAssigneeComponent implements OnInit {
  @Output() onChanged: EventEmitter<unknown> = new EventEmitter();
  @Input() task: Task;
  @Input() users: User[];

  constructor(
    private _task: TaskService,
    private _notification: NzNotificationService
  ) { }

  ngOnInit(): void {
  }

  onAssign(userId: number) {
    this._task.assign(this.task.id, userId).subscribe((res: Task) => {
      this.onChanged.emit();
    }, error => {
      this._notification.error('Error', error.message);
    })
  }
}
