import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { TaskService } from '@/services/task.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TaskAssigneeComponent } from '../../components/task-assignee/task-assignee.component';
import { TaskStatusComponent } from '../../components/task-status/task-status.component';
import { TaskDetailComponent } from './task-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { TaskManagementComponent } from '../task-management/task-management.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BehaviorSubject, Subject, of } from 'rxjs';
import * as exp from 'constants';


const routes: Routes = [
  {
    path: 'tasks',
    component: TaskManagementComponent
  }
]
describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskService: TaskService;
  let router: any;
  let activatedRoute: any;


  describe('valid taskId', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TaskDetailComponent, TaskStatusComponent, TaskAssigneeComponent, TaskManagementComponent],
        imports: [BrowserAnimationsModule, NzSpinModule, NzTableModule, RouterTestingModule.withRoutes(routes), NzCardModule, NzDropDownModule, NzNotificationModule],
        providers: [TaskService, {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject<any>({ id: 1 })
          }
        }, {
            provide: Router,
            useValue: {
              navigate: (args: any) => { }
            }
          }]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TaskDetailComponent);
      component = fixture.componentInstance;
      taskService = TestBed.inject(TaskService);
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load task detail', waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(component.task).toBeTruthy();
        expect(component.task.id).toEqual(1);
      })
    }))
  })

  describe('invalid taskId', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TaskDetailComponent, TaskStatusComponent, TaskAssigneeComponent, TaskManagementComponent],
        imports: [BrowserAnimationsModule, NzSpinModule, NzTableModule, RouterTestingModule.withRoutes(routes), NzCardModule, NzDropDownModule, NzNotificationModule],
        providers: [TaskService, {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject<any>({ id: 9 })
          }
        }, {
            provide: Router,
            useValue: {
              navigate: (args: any) => { }
            }
          }]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TaskDetailComponent);
      component = fixture.componentInstance;
      taskService = TestBed.inject(TaskService);
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should redirect to task management page if detail not found', fakeAsync(() => {
      const navigateSpy = spyOn(router, 'navigate');
      component.taskId = 999;
      component.getTask();
      tick(1000);
      expect(component.task).toBeFalsy();
      expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
      flush();
    }));
  })
});
