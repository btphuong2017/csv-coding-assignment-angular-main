import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TaskService } from '@/services/task.service';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: TaskService;
  let modalRef : NzModalRef

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [FormsModule, ReactiveFormsModule, NzFormModule, NzModalModule, NzInputModule, RouterTestingModule],
      providers: [TaskService, NzModalService, {
        provide: NzModalRef,
        useValue: {
          destroy: () => { },
          updateConfig: (config: any) => { },
          triggerOk: () => { }
        }
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    modalRef = TestBed.inject(NzModalRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be create', () => {
    expect(component.formGroup).toBeTruthy();
    expect(component.formGroup.get('name')).toBeTruthy();
    expect(component.formGroup.get('description')).toBeTruthy();
  })

  it('form should be render', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[name="name"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[name="description"]')).toBeTruthy();
  })

  it('form should be invalid when name empty', () => {
    component.formGroup.get('name').setValue('');
    component.formGroup.get('description').setValue('TEST');
    expect(component.formGroup.valid).toBeFalsy();
  })

  it('form should be invalid when description empty', () => {
    component.formGroup.get('name').setValue('TEST');
    component.formGroup.get('description').setValue('');
    expect(component.formGroup.valid).toBeFalsy();
  })

  it('form should be valid', () => {
    component.formGroup.get('name').setValue('TEST');
    component.formGroup.get('description').setValue('TEST');
    expect(component.formGroup.invalid).toBeFalsy();
  })

  it('form should trigger NzModalRef nzOnOK when submit', () => {
    component.formGroup.get('name').setValue('TEST');
    component.formGroup.get('description').setValue('TEST');
    expect(component.formGroup.invalid).toBeFalsy();

    const spyTriggerOk = spyOn(modalRef, 'triggerOk');
    component.onSubmit();
    expect(spyTriggerOk).toHaveBeenCalled();
  })
});
