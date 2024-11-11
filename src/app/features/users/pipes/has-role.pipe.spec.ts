import { HasRolePipe } from './has-role.pipe';
import { User } from '../models/user.model';

describe('HasRolePipe', () => {
  let pipe: HasRolePipe;

  beforeEach(() => {
    pipe = new HasRolePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false for null user', () => {
    expect(pipe.transform(null, 'admin')).toBeFalsy();
  });

  it('should return false for undefined user', () => {
    expect(pipe.transform(undefined, 'admin')).toBeFalsy();
  });

  it('should return true when user has matching role', () => {
    const user: User = { role: 'admin' } as User;
    expect(pipe.transform(user, 'admin')).toBeTruthy();
  });

  it('should return false when user has different role', () => {
    const user: User = { role: 'user' } as User;
    expect(pipe.transform(user, 'admin')).toBeFalsy();
  });
});
