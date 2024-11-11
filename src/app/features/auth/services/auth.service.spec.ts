import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';
import { of } from 'rxjs';
import { mockUser } from '../store/auth.reducer.spec';

describe('AuthService', () => {
  let service: AuthService;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    storeMock.select.and.returnValue(of(null));

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Store, useValue: storeMock }],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initializeAuth', () => {
    it('should dispatch setLoginData when token and user exist', () => {
      const token = 'test-token';
      spyOn(localStorage, 'getItem').and.returnValues(
        token,
        JSON.stringify(mockUser)
      );

      service.initializeAuth();

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        AuthActions.setLoginData({ token, user: mockUser })
      );
    });

    it('should not dispatch when token or user is missing', () => {
      spyOn(localStorage, 'getItem').and.returnValues(null, null);

      service.initializeAuth();

      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('auth state selectors', () => {
    it('should select isAuthenticated state', () => {
      storeMock.select.and.returnValue(of(true));

      service.isLoggedIn().subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should select current user', () => {
      storeMock.select.and.returnValue(of(mockUser));

      service.getCurrentUser().subscribe((result) => {
        expect(result).toEqual(mockUser);
      });
    });

    it('should select loading state', () => {
      storeMock.select.and.returnValue(of(true));

      service.getAuthLoading().subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should select error state', () => {
      const error = 'Test error';
      storeMock.select.and.returnValue(of(error));

      service.getAuthError().subscribe((result) => {
        expect(result).toBe(error);
      });
    });
  });

  describe('login and logout', () => {
    it('should dispatch login action', () => {
      const username = 'test';
      const password = 'pass';

      service.loginUser(username, password);

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        AuthActions.login({ username, password })
      );
    });

    it('should dispatch logout action', () => {
      service.logOut();

      expect(storeMock.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    });
  });
});
