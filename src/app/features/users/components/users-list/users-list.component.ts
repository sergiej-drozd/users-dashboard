import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersFormComponent } from '../users-form/users-form.component';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../../auth/services/auth.service';
import { HasRolePipe } from '../../pipes/has-role.pipe';
import { UserFormService } from '../../services/user-form.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UsersFormComponent, HasRolePipe],
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private userFormService = inject(UserFormService);
  users$: Observable<User[]> = this.usersService.getUsers();
  loading$: Observable<boolean> = this.usersService.getUsersLoading();
  error$: Observable<string | null> = this.usersService.getUsersError();
  currentUser$ = this.authService.getCurrentUser();
  formUser$ = this.userFormService.getUsersFormUser();
  isFormOpen$ = this.userFormService.getUsersFormIsOpen();

  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  onEdit(user: User) {
    this.userFormService.openForm(user);
  }

  signOut() {
    this.authService.logOut();
  }
}
