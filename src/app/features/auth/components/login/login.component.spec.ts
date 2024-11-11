import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      getAuthError: jasmine.createSpy('getAuthError').and.returnValue(of(null)),
      getAuthLoading: jasmine
        .createSpy('getAuthLoading')
        .and.returnValue(of(false)),
      loginUser: jasmine.createSpy('loginUser'),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password controls', () => {
    expect(component.loginForm.contains('username')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should make the username control required', () => {
    const control = component.loginForm.get('username');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the password control required', () => {
    const control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should call authService.loginUser when form is valid and submitted', () => {
    component.loginForm.setValue({
      username: 'testuser',
      password: 'password',
    });
    component.onSubmit();
    expect(authServiceMock.loginUser).toHaveBeenCalledWith(
      'testuser',
      'password'
    );
  });

  it('should not call authService.loginUser when form is invalid', () => {
    component.loginForm.setValue({ username: '', password: 'password' });
    component.onSubmit();
    expect(authServiceMock.loginUser).not.toHaveBeenCalled();
  });
});
