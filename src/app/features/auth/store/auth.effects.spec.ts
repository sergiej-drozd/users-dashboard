import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthEffects } from './auth.effects';
import { AuthActions } from './auth.actions';
import { Observable, of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { mockUser } from './auth.reducer.spec';
import { RouterTestingModule } from '@angular/router/testing';

describe('Auth Effects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: Router, useValue: routerSpy },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle login API call', (done) => {
    const token = 'token';
    const action = AuthActions.login({ username: 'test', password: 'test' });
    const outcome = AuthActions.loginSuccess({ token, user: mockUser });

    actions$ = of(action);

    effects.login$.subscribe((result) => {
      expect(result).toEqual(outcome);
      done();
    });

    const req = httpMock.expectOne('/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token, user: mockUser });
  });

  it('should handle login success side effects', (done) => {
    const token = 'token';
    const action = AuthActions.loginSuccess({ token, user: mockUser });

    actions$ = of(action);

    effects.loginSuccess$.subscribe(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', token);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(mockUser)
      );
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('should handle login failure', (done) => {
    const action = AuthActions.login({ username: 'test', password: 'test' });
    const outcome = AuthActions.loginFailure({
      error: 'Http failure response for /auth/login: 401 Unauthorized',
    });

    actions$ = of(action);

    effects.login$.subscribe((result) => {
      expect(result).toEqual(outcome);
      done();
    });

    const req = httpMock.expectOne('/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(
      { message: 'Invalid credentials' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });

  it('should handle logout', (done) => {
    const action = AuthActions.logout();

    actions$ = of(action);

    effects.logout$.subscribe(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });

    const req = httpMock.expectOne('/auth/logout');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
