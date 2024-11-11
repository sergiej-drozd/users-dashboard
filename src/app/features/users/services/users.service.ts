import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersActions } from '../store/users.actions';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import {
  selectUsers,
  selectUsersError,
  selectUsersLoading,
} from '../store/users.selectors';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private store = inject(Store);

  loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  getUsers(): Observable<User[]> {
    return this.store.select(selectUsers);
  }

  getUsersLoading(): Observable<boolean> {
    return this.store.select(selectUsersLoading);
  }

  getUsersError(): Observable<string | null> {
    return this.store.select(selectUsersError);
  }
}
