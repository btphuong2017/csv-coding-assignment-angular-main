import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DesktopOutline,
  PieChartOutline
} from '@ant-design/icons-angular/icons';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';

const icons: IconDefinition[] = [
  PieChartOutline,
  DesktopOutline
];

@NgModule({
  declarations: [
    MainLayoutComponent,
    BreadcrumbComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule.forChild(icons),
    NzBreadCrumbModule
  ]
})
export class MainLayoutModule { }
