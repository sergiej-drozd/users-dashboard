import * as fromSelectors from './users.selectors';
import { UsersState } from './users.reducer';
import { mockUser } from './users.reducer.spec';

describe('Users Selectors', () => {
  const initialState: UsersState = {
    users: [mockUser],
    loading: false,
    error: null,
    form: {
      isOpen: true,
      user: mockUser,
      loading: false,
      error: null,
    },
  };

  it('should select users', () => {
    const result = fromSelectors.selectUsers.projector(initialState);
    expect(result).toEqual([mockUser]);
  });

  it('should select users loading state', () => {
    const result = fromSelectors.selectUsersLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('should select users error state', () => {
    const stateWithError = { ...initialState, error: 'Test error' };
    const result = fromSelectors.selectUsersError.projector(stateWithError);
    expect(result).toBe('Test error');
  });

  it('should select form state', () => {
    const result = fromSelectors.selectUsersForm.projector(initialState);
    expect(result).toEqual(initialState.form);
  });

  it('should select form isOpen state', () => {
    const result = fromSelectors.selectUsersFormIsOpen.projector(
      initialState.form
    );
    expect(result).toBe(true);
  });

  it('should select form loading state', () => {
    const result = fromSelectors.selectUsersFormLoading.projector(
      initialState.form
    );
    expect(result).toBe(false);
  });

  it('should select form error state', () => {
    const formWithError = { ...initialState.form, error: 'Form error' };
    const result = fromSelectors.selectUsersFormError.projector(formWithError);
    expect(result).toBe('Form error');
  });

  it('should select form user', () => {
    const result = fromSelectors.selectUsersFormUser.projector(
      initialState.form
    );
    expect(result).toEqual(mockUser);
  });
});
