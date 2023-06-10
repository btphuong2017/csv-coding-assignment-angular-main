import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('@/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'tasks', loadChildren: () => import('@/modules/task/task.module').then(m => m.TaskModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
