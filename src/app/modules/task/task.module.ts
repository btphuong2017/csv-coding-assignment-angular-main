import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TaskManagementComponent } from './pages/task-management/task-management.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskStatusComponent } from './components/task-status/task-status.component';
import { TaskAssigneeComponent } from './components/task-assignee/task-assignee.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    TaskComponent,
    TaskManagementComponent,
    TaskDetailComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskStatusComponent,
    TaskAssigneeComponent,
    TaskFilterComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzSpinModule,
    NzTableModule,
    NzNotificationModule,
    NzInputModule,
    NzFormModule,
    NzDropDownModule,
    NzModalModule,
    NzGridModule,
    NzSelectModule,
    NzIconModule.forChild([
      PlusOutline,
    ])
  ],
  exports: [
    TaskFilterComponent
  ]
})
export class TaskModule { }
