import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UserFormService } from '../../services/user-form.service';
import { HasRolePipe } from '../../pipes/has-role.pipe';
import { of } from 'rxjs';
import { User } from '../../models/user.model';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userFormServiceSpy: jasmine.SpyObj<UserFormService>;

  const mockUser: User = {
    id: '1',
    name: 'Test User',
    role: 'admin',
    password: 'test',
  };

  beforeEach(async () => {
    const usersSpy = jasmine.createSpyObj('UsersService', [
      'getUsers',
      'getUsersLoading',
      'getUsersError',
      'loadUsers',
    ]);
    const authSpy = jasmine.createSpyObj('AuthService', [
      'getCurrentUser',
      'logOut',
    ]);
    const formSpy = jasmine.createSpyObj('UserFormService', [
      'getUsersFormUser',
      'getUsersFormIsOpen',
      'openForm',
    ]);

    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [
        { provide: UsersService, useValue: usersSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: UserFormService, useValue: formSpy },
        HasRolePipe,
      ],
    }).compileComponents();

    usersServiceSpy = TestBed.inject(
      UsersService
    ) as jasmine.SpyObj<UsersService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userFormServiceSpy = TestBed.inject(
      UserFormService
    ) as jasmine.SpyObj<UserFormService>;

    usersServiceSpy.getUsers.and.returnValue(of([mockUser]));
    usersServiceSpy.getUsersLoading.and.returnValue(of(false));
    usersServiceSpy.getUsersError.and.returnValue(of(null));
    authServiceSpy.getCurrentUser.and.returnValue(of(mockUser));
    userFormServiceSpy.getUsersFormUser.and.returnValue(of(null));
    userFormServiceSpy.getUsersFormIsOpen.and.returnValue(of(false));

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    component.ngOnInit();
    expect(usersServiceSpy.loadUsers).toHaveBeenCalled();
  });

  it('should open form for editing user', () => {
    component.onEdit(mockUser);
    expect(userFormServiceSpy.openForm).toHaveBeenCalledWith(mockUser);
  });

  it('should call logout when signing out', () => {
    component.signOut();
    expect(authServiceSpy.logOut).toHaveBeenCalled();
  });
});
