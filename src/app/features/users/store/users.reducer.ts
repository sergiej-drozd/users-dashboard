import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { UsersActions } from './users.actions';

export type UserForm = {
  isOpen: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
};
export type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
  form: UserForm;
};

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  form: {
    isOpen: false,
    user: null,
    loading: false,
    error: null,
  },
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UsersActions.updateUser, (state, { user }) => ({
    ...state,
    form: {
      ...state.form,
      loading: true,
    },
  })),
  on(UsersActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    form: {
      ...state.form,
      loading: false,
      isOpen: false,
      user: null,
    },
  })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    form: {
      ...state.form,
      loading: false,
      error,
    },
  })),
  on(UsersActions.openForm, (state, { user }) => ({
    ...state,
    form: {
      ...state.form,
      user,
      isOpen: true,
    },
  })),
  on(UsersActions.closeForm, (state) => ({
    ...state,
    form: {
      ...state.form,
      user: null,
      isOpen: false,
      loading: false,
      error: null,
    },
  }))
);
