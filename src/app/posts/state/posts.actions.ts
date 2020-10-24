import { createAction, props } from '@ngrx/store';
import { Post } from '../post';


export const setCurrentPost = createAction(
  '[Posts] Set Current Post',
  props<{ currentPostId: number }>()
);

export const clearCurrentPost = createAction(
  '[Posts] Clear Current Post',
);

export const setCurrentUser = createAction(
  '[Posts] Set Current User',
  props<{ currentUserId: number }>()
);

export const clearCurrentUser = createAction(
  '[Posts] Clear Current User',
);

export const loadClientNextPosts = createAction(
  '[Posts] Load Client Next Posts',
);

export const loadClientPrevPosts = createAction(
  '[Posts] Load Client Prev Posts',
);

export const loadPosts = createAction(
  '[Posts] Load Posts',
);

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>()
);

export const loadUserPosts = createAction(
  '[Posts] Load User Posts',
  props<{ userId: number }>()
);

export const loadUserPostsSuccess = createAction(
  '[Posts] Load User Posts Success',
  props<{ posts: Post[] }>()
);

export const loadUserPostsFailure = createAction(
  '[Posts] Load User Posts Failure',
  props<{ error: string }>()
);

