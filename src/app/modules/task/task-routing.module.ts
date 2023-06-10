import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { TaskManagementComponent } from './pages/task-management/task-management.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';

const routes: Routes = [
  {
    path: "",
    component: TaskComponent,
    children: [
      { 
        path: "",
        pathMatch: "full",
        component: TaskManagementComponent,
        data: {
          animation: 'ManagementPage'
        }
      },
      {
        path: ":id",
        component: TaskDetailComponent,
        data: {
          animation: 'DetailPage'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
