import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../users/models/user.model';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
} from '../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private store = inject(Store);

  initializeAuth(): void {
    const token = localStorage.getItem('authToken');
    const user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
    if (token && user?.id) {
      this.store.dispatch(AuthActions.setLoginData({ token, user }));
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }

  getCurrentUser(): Observable<User | null> {
    return this.store.select(selectUser);
  }

  getAuthLoading(): Observable<boolean> {
    return this.store.select(selectAuthLoading);
  }

  getAuthError(): Observable<string | null> {
    return this.store.select(selectAuthError);
  }

  loginUser(username: string, password: string): void {
    this.store.dispatch(AuthActions.login({ username, password }));
  }

  logOut(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
