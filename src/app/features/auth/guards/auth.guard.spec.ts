import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should return true if the user is authenticated', (done) => {
    authService.isLoggedIn.and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      authGuard().subscribe((result) => {
        expect(result).toBeTrue();
        done();
      });
    });
  });

  it('should return a URL tree if the user is not authenticated', (done) => {
    const urlTree = new UrlTree();
    authService.isLoggedIn.and.returnValue(of(false));
    router.createUrlTree.and.returnValue(urlTree);

    TestBed.runInInjectionContext(() => {
      authGuard().subscribe((result) => {
        expect(result).toBe(urlTree);
        done();
      });
    });
  });
});
