import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import * as UserActions from './user.actions';
import { User } from '../user';

export const userFeatureKey = 'user';

export interface State extends AppState.State {
  user: UserState;
}

export interface UserState {
  users: User[];
  currentUserId: number | null;
  error: string;
}

const initialState: UserState = {
  users: [],
  currentUserId: null,
  error: ''
};

const getUserFeatureState = createFeatureSelector<UserState>(userFeatureKey);

export const getUsers = createSelector(
  getUserFeatureState,
  state => state.users
);

export const getCurrentUserId = createSelector(
  getUserFeatureState,
  state => state.currentUserId
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  (state, currentUserId) => state.users.find(user => user.id === currentUserId)
);


export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.setCurrentUsers, (state, action): UserState => {
    return {
      ...state,
     currentUserId: action.currentUserId
    }
  }),
  on(UserActions.clearCurrentUsers, (state): UserState => {
    return {
      ...state,
      currentUserId: null
    }
  }),
  on(UserActions.loadUsersSuccess, (state, action): UserState => {
    return {
      ...state,
      error: '',
      users: action.users
    }
  }),
  on(UserActions.loadUsersFailure, (state, action): UserState => {
    return {
      ...state,
      error: action.error,
    }
  })
);

