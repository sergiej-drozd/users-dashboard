import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectUsersFormError,
  selectUsersFormIsOpen,
  selectUsersFormLoading,
  selectUsersFormUser,
} from '../store/users.selectors';
import { User } from '../models/user.model';
import { UsersActions } from '../store/users.actions';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  private store = inject(Store);

  openForm(user: User): void {
    this.store.dispatch(UsersActions.openForm({ user }));
  }

  submitForm(user: User): void {
    this.store.dispatch(UsersActions.updateUser({ user }));
  }

  closeForm(): void {
    this.store.dispatch(UsersActions.closeForm());
  }

  getUsersFormLoading(): Observable<boolean> {
    return this.store.select(selectUsersFormLoading);
  }

  getUsersFormError(): Observable<string | null> {
    return this.store.select(selectUsersFormError);
  }

  getUsersFormIsOpen(): Observable<boolean> {
    return this.store.select(selectUsersFormIsOpen);
  }

  getUsersFormUser(): Observable<User | null> {
    return this.store.select(selectUsersFormUser);
  }
}
