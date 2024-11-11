import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { User } from '../../users/models/user.model';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);
  http = inject(HttpClient);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.http
          .post<{ token: string; user: User }>('/auth/login', {
            username: action.username,
            password: action.password,
          })
          .pipe(
            map((response) => AuthActions.loginSuccess(response)),
            catchError((error) =>
              of(AuthActions.loginFailure({ error: error.message }))
            )
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          localStorage.setItem('authToken', action.token);
          localStorage.setItem('user', JSON.stringify(action.user));
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        }),
        exhaustMap(() => this.http.post('/auth/logout', {}))
      ),
    { dispatch: false }
  );
}
