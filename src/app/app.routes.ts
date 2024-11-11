import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';
import { notAuthGuard } from './features/auth/guards/not-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [notAuthGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import(
        './features/users/components/users-list/users-list.component'
      ).then((m) => m.UsersListComponent),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' },
];
