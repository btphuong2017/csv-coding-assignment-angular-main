import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { TaskAssigneeComponent } from './task-assignee.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { TaskService } from '@/services/task.service';
import { Task } from '@/interfaces/task';
import { TaskStatus } from '@/enums/task';
import { of } from 'rxjs';

const unassignTask: Task = {
  id: 1,
  name: 'Task 1',
  description: 'Description 1',
  assignee: null,
  status: TaskStatus.NEW
}

const mockUsers = [
  {
    id: 1,
    name: 'User 1',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'User 2',
    avatar: 'https://i.pravatar.cc/150?img=2'
  }

];
const assignedTask: Task = {
  id: 2,
  name: 'Task 2',
  description: 'Description 2',
  assignee: {
    id: 2,
    name: 'User 2',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  status: TaskStatus.NEW
}
describe('TaskAssigneeComponent', () => {
  let component: TaskAssigneeComponent;
  let fixture: ComponentFixture<TaskAssigneeComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskAssigneeComponent],
      imports: [
        CommonModule,
        NzDropDownModule,
        NzIconModule.forChild([
          PlusOutline,
        ])
      ],
      providers: [{
        provide: TaskService,
        useValue: {
          users: of(mockUsers),
          assign: (taskId: number, userId: number) => {
            if (taskId === 1) {
              return of({ ...unassignTask, ...{ assignee: mockUsers.find(u => u.id === userId) } });
            } else {
              return of({ ...assignedTask, ...{ assignee: mockUsers.find(u => u.id === userId) } });
            }
          },
          update: (task: Task) => of(task)
        }
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAssigneeComponent);
    taskService = TestBed.inject(TaskService);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('assignee dropdown should work', fakeAsync(() => {
    const compiled = fixture.nativeElement;
    const dropdownTrigger = compiled.querySelector('.ant-dropdown-trigger');
    expect(dropdownTrigger).toBeTruthy();
    dropdownTrigger.click();
    tick(1000);
    console.log(document.querySelector('.ant-dropdown'));
    // expect(compiled.querySelector('.ant-dropdown')).toBeTruthy();
    // expect(compiled.querySelectorAll('.ant-dropdown-menu-item').length).toEqual(3);
  }));

  describe('When unassign task', () => {
    beforeEach(async () => {
      component.task = unassignTask;
      
      fixture.detectChanges();
    });

    it('should render unset template', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.task-assignee.unset')).toBeTruthy();
    })
  })

  describe('When assigned task', () => {
    beforeEach(async () => {
      component.task = assignedTask;
      fixture.detectChanges();
    });

    it('should render assignee template', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.task-assignee')).toBeTruthy();
      expect(compiled.querySelector('.task-assignee img').src).toEqual(assignedTask.assignee.avatar);
    })
  })

  beforeEach(() => {
    component.task = assignedTask;
    component.users = mockUsers;
    fixture.detectChanges();
  })

  it('should assign user when call onAssign', fakeAsync(() => {
    console.log(taskService);
    const spyOnAssign = spyOn(taskService, 'assign').and.callThrough();
    component.onAssign(mockUsers[0].id);
    tick(1000);
    expect(spyOnAssign).toHaveBeenCalledWith(assignedTask.id, mockUsers[0].id);
    expect(component.task.assignee).toEqual(mockUsers[0]);
  }));

  it('should trigger onChange after assigned', fakeAsync(() => {
    const spyOnChange = spyOn(component.onChanged, 'emit');
    component.onAssign(mockUsers[0].id);
    tick(1000);
    expect(spyOnChange).toHaveBeenCalled();
  }))
});
