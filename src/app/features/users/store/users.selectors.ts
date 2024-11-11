import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const selectUsersForm = createSelector(
  selectUsersState,
  (state) => state.form
);

export const selectUsersFormIsOpen = createSelector(
  selectUsersForm,
  (state) => state.isOpen
);
export const selectUsersFormLoading = createSelector(
  selectUsersForm,
  (state) => state.loading
);
export const selectUsersFormError = createSelector(
  selectUsersForm,
  (state) => state.error
);
export const selectUsersFormUser = createSelector(
  selectUsersForm,
  (state) => state.user
);
