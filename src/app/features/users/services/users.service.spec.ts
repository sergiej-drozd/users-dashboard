import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UsersService } from './users.service';
import { UsersActions } from '../store/users.actions';
import { User } from '../models/user.model';
import { mockUser } from '../store/users.reducer.spec';

describe('UsersService', () => {
  let service: UsersService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideMockStore({
          initialState: {
            users: {
              users: [],
              loading: false,
              error: null,
            },
          },
        }),
      ],
    });

    service = TestBed.inject(UsersService);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch loadUsers action', () => {
    service.loadUsers();
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.loadUsers());
  });

  it('should select users', fakeAsync(() => {
    const mockUsers: User[] = [mockUser];
    store.setState({
      users: { users: mockUsers, loading: false, error: null },
    });

    let result: User[] | undefined;
    service.getUsers().subscribe((users) => (result = users));
    tick();

    expect(result).toEqual(mockUsers);
  }));

  it('should select loading state', fakeAsync(() => {
    store.setState({ users: { users: [], loading: true, error: null } });

    let result: boolean | undefined;
    service.getUsersLoading().subscribe((loading) => (result = loading));
    tick();

    expect(result).toBeTrue();
  }));

  it('should select error state', fakeAsync(() => {
    const error = 'Test error';
    store.setState({ users: { users: [], loading: false, error } });

    let result: string | null | undefined;
    service.getUsersError().subscribe((err) => (result = err));
    tick();

    expect(result).toBe(error);
  }));
});
