import { initialState, usersReducer } from './users.reducer';
import { UsersActions } from './users.actions';
import { User } from '../models/user.model';

export const mockUser: User = {
  id: '1',
  name: 'Test User',
  password: 'test',
  role: 'admin',
};
describe('Users Reducer', () => {
  it('should return initial state', () => {
    const action = { type: 'unknown' };
    const state = usersReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should set loading on loadUsers', () => {
    const action = UsersActions.loadUsers();
    const state = usersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set users on loadUsersSuccess', () => {
    const users = [mockUser];
    const action = UsersActions.loadUsersSuccess({ users });
    const state = usersReducer(initialState, action);
    expect(state.users).toBe(users);
    expect(state.loading).toBe(false);
  });

  it('should set error on loadUsersFailure', () => {
    const error = 'Test error';
    const action = UsersActions.loadUsersFailure({ error });
    const state = usersReducer(initialState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should set form loading on updateUser', () => {
    const action = UsersActions.updateUser({ user: mockUser });
    const state = usersReducer(initialState, action);
    expect(state.form.loading).toBe(true);
  });

  it('should update user on updateUserSuccess', () => {
    const initialStateWithUsers = {
      ...initialState,
      users: [mockUser, { ...mockUser, id: '2' }],
    };
    const updatedUser = { ...mockUser, name: 'New Name' };
    const action = UsersActions.updateUserSuccess({ user: updatedUser });
    const state = usersReducer(initialStateWithUsers, action);
    expect(state.users[0]).toEqual(updatedUser);
    expect(state.form.isOpen).toBe(false);
  });

  it('should set form error on updateUserFailure', () => {
    const error = 'Test error';
    const action = UsersActions.updateUserFailure({ error });
    const state = usersReducer(initialState, action);
    expect(state.form.error).toBe(error);
    expect(state.form.loading).toBe(false);
  });

  it('should open form with user', () => {
    const action = UsersActions.openForm({ user: mockUser });
    const state = usersReducer(initialState, action);
    expect(state.form.isOpen).toBe(true);
    expect(state.form.user).toBe(mockUser);
  });

  it('should close form and reset form state', () => {
    const stateWithOpenForm = {
      ...initialState,
      form: {
        isOpen: true,
        user: mockUser,
        loading: true,
        error: 'Some error',
      },
    };
    const action = UsersActions.closeForm();
    const state = usersReducer(stateWithOpenForm, action);
    expect(state.form).toEqual({
      isOpen: false,
      user: null,
      loading: false,
      error: null,
    });
  });
});
