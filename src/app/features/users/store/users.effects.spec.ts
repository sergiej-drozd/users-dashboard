import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { UsersEffects } from './users.effects';
import { UsersActions } from './users.actions';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockUser } from './users.reducer.spec';
import { provideMockStore } from '@ngrx/store/testing';

describe('UsersEffects', () => {
  let effects: UsersEffects;
  let actions$: Observable<any>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UsersEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should load users successfully', (done) => {
    const mockUsers = [mockUser];
    actions$ = of(UsersActions.loadUsers());

    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.loadUsersSuccess({ users: mockUsers })
      );
      done();
    });

    const req = httpTestingController.expectOne('/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle load users error', (done) => {
    actions$ = of(UsersActions.loadUsers());

    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.loadUsersFailure({
          error: 'Http failure response for /users: 401 Unauthorized',
        })
      );
      done();
    });

    const req = httpTestingController.expectOne('/users');
    req.flush(
      { message: 'Invalid credentials' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });

  it('should update user successfully', (done) => {
    actions$ = of(UsersActions.updateUser({ user: mockUser }));

    effects.updateUser$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.updateUserSuccess({ user: mockUser })
      );
      done();
    });

    const req = httpTestingController.expectOne(`/users/${mockUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUser);
    req.flush({});
  });

  it('should handle update user error', (done) => {
    actions$ = of(UsersActions.updateUser({ user: mockUser }));

    effects.updateUser$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.updateUserFailure({
          error: 'Http failure response for /users/1: 401 Unauthorized',
        })
      );
      done();
    });

    const req = httpTestingController.expectOne(`/users/${mockUser.id}`);
    req.flush(
      { message: 'Invalid credentials' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });
});
