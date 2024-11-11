import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserFormPayload } from '../../models/user.model';
import { UserFormService } from '../../services/user-form.service';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent implements OnInit {
  @Input() user?: User | null;

  private fb = inject(NonNullableFormBuilder);
  private userFormService = inject(UserFormService);

  user$ = this.userFormService.getUsersFormUser();
  loading$ = this.userFormService.getUsersFormLoading();
  error$ = this.userFormService.getUsersFormError();
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.user?.name ?? '', Validators.required],
      password: [this.user?.password ?? '', Validators.required],
      role: [this.user?.role ?? 'user', Validators.required],
    });
  }

  onSubmit() {
    const value = this.form.value as UserFormPayload;
    if (this.user) {
      this.userFormService.submitForm({ ...this.user, ...value });
    }
  }

  onClose() {
    this.userFormService.closeForm();
  }
}
