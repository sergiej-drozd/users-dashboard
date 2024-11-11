import { authReducer, initialState } from './auth.reducer';
import { AuthActions } from './auth.actions';
import { User } from '../../users/models/user.model';

export const mockUser: User = {
  id: '1',
  name: 'Test User',
  password: 'test',
  role: 'user',
};
describe('Auth Reducer', () => {
  it('should handle login', () => {
    const action = AuthActions.login({ username: 'test', password: 'test' });
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle login success', () => {
    const action = AuthActions.loginSuccess({ token: 'token', user: mockUser });
    const state = authReducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle login failure', () => {
    const action = AuthActions.loginFailure({ error: 'Error message' });
    const state = authReducer(initialState, action);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error message');
  });

  it('should handle logout', () => {
    const action = AuthActions.logout();
    const state = authReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
