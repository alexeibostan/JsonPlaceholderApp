import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import * as PostsActions from './posts.actions';
import { Post } from '../post';

export const postsFeatureKey = 'posts';

export interface State extends AppState.State {
 posts: PostsState
};

export interface PostsState {
  posts: Post[];
  currentUserId: number | null;
  currentPostId: number | null;
  visiblePosts: number;
  visiblePostsPage: number
  error: string;
}

export const initialState: PostsState = {
  posts: [],
  currentUserId: null,
  currentPostId: null,
  visiblePosts: 10,
  visiblePostsPage: 0,
  error: ''
};

const getPostsFeatureState = createFeatureSelector<PostsState>(postsFeatureKey);

export const getVisiblePosts = createSelector(
  getPostsFeatureState,
  state => state.visiblePosts
);

export const getVisiblePostsPage = createSelector(
  getPostsFeatureState,
  state => state.visiblePostsPage
);

export const getPosts = createSelector(
  getPostsFeatureState,
  getVisiblePosts,
  getVisiblePostsPage,
  (state, visiblePosts, visiblePostsPage) => {
    const startIndex = visiblePostsPage * visiblePosts;
    const endIndex  = startIndex + visiblePosts;
    return state.posts.slice(startIndex, endIndex);
  }
);

export const getPostsLength = createSelector(
  getPostsFeatureState,
  state => state.posts.length
);

export const getCurrentPostId = createSelector(
  getPostsFeatureState,
  state => state.currentUserId
);

export const getCurrentPost = createSelector(
  getPostsFeatureState,
  getCurrentPostId,
  (state, currentPostId) => state.posts.find(post => post.id === currentPostId)
);

export const postsReducer = createReducer<PostsState>(
  initialState,
  on(PostsActions.setCurrentUser, (state, action): PostsState => {
    return {
      ...state,
     currentUserId: action.currentUserId
    }
  }),
  on(PostsActions.clearCurrentUser, (state): PostsState => {
    return {
      ...state,
     currentUserId: null
    }
  }),
  on(PostsActions.setCurrentPost, (state, action): PostsState => {
    return {
      ...state,
     currentPostId: action.currentPostId
    }
  }),
  on(PostsActions.clearCurrentPost, (state): PostsState => {
    return {
      ...state,
      currentPostId: null
    }
  }),
  on(
    PostsActions.loadClientPrevPosts, (state): PostsState => {
    let newVisiblePostsPage =  state.visiblePostsPage - 1;
    newVisiblePostsPage = newVisiblePostsPage < 0 ? 0 : newVisiblePostsPage;
    return {
      ...state,
      visiblePostsPage: newVisiblePostsPage
    }
  }),
  on(
    PostsActions.loadClientNextPosts, (state): PostsState => {
    let newVisiblePostsPage =  state.visiblePostsPage + 1;
    newVisiblePostsPage = (newVisiblePostsPage * state.visiblePosts) >= state.posts.length ? state.visiblePostsPage : newVisiblePostsPage;
    return {
      ...state,
      visiblePostsPage: newVisiblePostsPage
    }
  }),
  on(
    PostsActions.loadPostsSuccess,
    PostsActions.loadUserPostsSuccess, (state, action): PostsState => {
    return {
      ...state,
      error: '',
      posts: action.posts
    }
  }),
  on(
    PostsActions.loadPostsFailure,
    PostsActions.loadUserPostsFailure, (state, action): PostsState => {
    return {
      ...state,
      error: action.error,
    }
  }),
);

