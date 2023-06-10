import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EllipsisOutline } from '@ant-design/icons-angular/icons';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { TaskAssigneeComponent } from '../task-assignee/task-assignee.component';
import { TaskService } from '@/services/task.service';
import { RouterTestingModule } from "@angular/router/testing";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent, TaskStatusComponent, TaskAssigneeComponent ],
      imports: [
        NzTableModule,
        NzSpinModule,
        NzModalModule,
        NzDropDownModule,
        RouterTestingModule,
        NzIconModule.forChild([
          EllipsisOutline
        ])
      ],
      providers: [TaskService, NzModalService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTasks', () => {
    spyOn(component, 'getTasks');
    component.ngOnInit();
    expect(component.getTasks).toHaveBeenCalled();
  })
});
