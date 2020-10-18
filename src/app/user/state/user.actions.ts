import { createAction, props } from '@ngrx/store';
import { User } from '../user';

export const setCurrentUsers = createAction(
  '[User] Set Current User',
  props<{ currentUserId: number }>()
);

export const clearCurrentUsers = createAction(
  '[User] Clear Current User',
);

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);
