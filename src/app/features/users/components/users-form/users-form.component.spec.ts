import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersFormComponent } from './users-form.component';
import { UserFormService } from '../../services/user-form.service';
import { of } from 'rxjs';

describe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;
  let userFormServiceSpy: jasmine.SpyObj<UserFormService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserFormService', [
      'getUsersFormUser',
      'getUsersFormLoading',
      'getUsersFormError',
      'submitForm',
      'closeForm',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, UsersFormComponent],
      providers: [{ provide: UserFormService, useValue: spy }],
    }).compileComponents();

    userFormServiceSpy = TestBed.inject(
      UserFormService
    ) as jasmine.SpyObj<UserFormService>;
    userFormServiceSpy.getUsersFormUser.and.returnValue(of(null));
    userFormServiceSpy.getUsersFormLoading.and.returnValue(of(false));
    userFormServiceSpy.getUsersFormError.and.returnValue(of(null));

    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.value).toEqual({
      name: '',
      password: '',
      role: 'user',
    });
  });

  it('should call submitForm on onSubmit', () => {
    component.form.setValue({ name: 'test', password: 'test', role: 'admin' });
    component.user = { id: '1', name: 'test', password: 'test', role: 'admin' };
    component.onSubmit();
    expect(userFormServiceSpy.submitForm).toHaveBeenCalledWith({
      id: '1',
      name: 'test',
      password: 'test',
      role: 'admin',
    });
  });

  it('should call closeForm on onClose', () => {
    component.onClose();
    expect(userFormServiceSpy.closeForm).toHaveBeenCalled();
  });
});
