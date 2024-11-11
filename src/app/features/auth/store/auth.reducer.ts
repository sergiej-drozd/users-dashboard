import { createReducer, on } from '@ngrx/store';
import { User } from '../../users/models/user.model';
import { AuthActions } from './auth.actions';

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
};

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, AuthActions.setLoginData, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    loading: false,
    error,
  })),
  on(AuthActions.logout, () => ({
    ...initialState,
  }))
);
