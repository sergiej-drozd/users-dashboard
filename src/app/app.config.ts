import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authReducer } from './features/auth/store/auth.reducer';
import { usersReducer } from './features/users/store/users.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';
import { UsersEffects } from './features/users/store/users.effects';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './features/auth/interceptors/auth.interceptor';
import { MockBackendInterceptor } from './backend/mock.interceptor';
import { AuthService } from './features/auth/services/auth.service';

export function initializeAuth(auth: AuthService) {
  return () => auth.initializeAuth();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MockBackendInterceptor,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAuth,
      deps: [AuthService],
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({
      auth: authReducer,
      users: usersReducer,
    }),
    provideEffects([AuthEffects, UsersEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
