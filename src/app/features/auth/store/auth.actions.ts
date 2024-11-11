import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../users/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ username: string; password: string }>(),
    'Login Success': props<{ token: string; user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Set Login Data': props<{ token: string; user: User }>(),
    Logout: emptyProps(),
  },
});
