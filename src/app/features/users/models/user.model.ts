export type Role = 'admin' | 'user';

export type User = {
  id: string;
  password: string;
  name: string;
  role: Role;
};

export type UserFormPayload = Omit<User, 'id'>;
