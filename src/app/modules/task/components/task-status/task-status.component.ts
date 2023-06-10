import { TaskStatus } from '@/enums/task';
import { Task } from '@/interfaces/task';
import { TaskService } from '@/services/task.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {
  @Output() onChanged: EventEmitter<unknown> = new EventEmitter();
  @Input() task: Task;

  constructor(private _task: TaskService) { }

  ngOnInit(): void {
  }

  onSelectStatus(status: TaskStatus) {
    this._task.updateStatus(this.task.id, status).subscribe((res: Task) => {
      this.onChanged.emit();
    });
  }


}
