import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserFormService } from './user-form.service';
import { UsersActions } from '../store/users.actions';
import { User } from '../models/user.model';
import { mockUser } from '../store/users.reducer.spec';

describe('UserFormService', () => {
  let service: UserFormService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserFormService,
        provideMockStore({
          initialState: {
            users: {
              form: {
                user: null,
                isOpen: false,
                loading: false,
                error: null,
              },
            },
          },
        }),
      ],
    });

    service = TestBed.inject(UserFormService);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch openForm action', () => {
    service.openForm(mockUser);
    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.openForm({ user: mockUser })
    );
  });

  it('should dispatch updateUser action', () => {
    service.submitForm(mockUser);
    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.updateUser({ user: mockUser })
    );
  });

  it('should dispatch closeForm action', () => {
    service.closeForm();
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.closeForm());
  });

  it('should select form loading state', fakeAsync(() => {
    store.setState({ users: { form: { loading: true } } });

    let result: boolean | undefined;
    service.getUsersFormLoading().subscribe((loading) => (result = loading));
    tick();

    expect(result).toBeTrue();
  }));

  it('should select form error state', fakeAsync(() => {
    const error = 'Test error';
    store.setState({ users: { form: { error } } });

    let result: string | null | undefined;
    service.getUsersFormError().subscribe((err) => (result = err));
    tick();

    expect(result).toBe(error);
  }));

  it('should select form isOpen state', fakeAsync(() => {
    store.setState({ users: { form: { isOpen: true } } });

    let result: boolean | undefined;
    service.getUsersFormIsOpen().subscribe((isOpen) => (result = isOpen));
    tick();

    expect(result).toBeTrue();
  }));

  it('should select form user', fakeAsync(() => {
    store.setState({ users: { form: { user: mockUser } } });

    let result: User | null | undefined;
    service.getUsersFormUser().subscribe((user) => (result = user));
    tick();

    expect(result).toEqual(mockUser);
  }));
});
