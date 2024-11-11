import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersActions } from './users.actions';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class UsersEffects {
  actions$ = inject(Actions);
  usersService = inject(UsersService);
  http = inject(HttpClient);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap(() =>
        this.http.get<User[]>('/users').pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UsersActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      exhaustMap(({ user }) =>
        this.http.put(`/users/${user.id}`, user).pipe(
          map(() => UsersActions.updateUserSuccess({ user })),
          catchError((error) =>
            of(UsersActions.updateUserFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
