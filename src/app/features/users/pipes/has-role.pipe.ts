import { Pipe, PipeTransform } from '@angular/core';
import { Role, User } from '../models/user.model';

@Pipe({
  name: 'hasRole',
  standalone: true,
})
export class HasRolePipe implements PipeTransform {
  transform(user: User | null | undefined, role: Role): boolean {
    if (!user) return false;
    return user.role === role;
  }
}
