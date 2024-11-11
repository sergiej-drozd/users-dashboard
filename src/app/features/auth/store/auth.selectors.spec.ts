import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from './auth.selectors';
import { AuthState } from './auth.reducer';
import { mockUser } from './auth.reducer.spec';

describe('Auth Selectors', () => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };

  it('should select the user', () => {
    const state = { ...initialState, user: mockUser };
    expect(selectUser.projector(state)).toEqual(mockUser);
  });

  it('should select isAuthenticated', () => {
    const state = { ...initialState, isAuthenticated: true };
    expect(selectIsAuthenticated.projector(state)).toBe(true);
  });

  it('should select loading', () => {
    const state = { ...initialState, loading: true };
    expect(selectAuthLoading.projector(state)).toBe(true);
  });

  it('should select error', () => {
    const state = { ...initialState, error: 'Error message' };
    expect(selectAuthError.projector(state)).toBe('Error message');
  });
});
