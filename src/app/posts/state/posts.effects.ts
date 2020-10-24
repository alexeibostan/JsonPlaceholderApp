import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { PostsService } from '../posts.service';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as PostsActions from './posts.actions';



@Injectable()
export class PostsEffects {

  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      mergeMap(() => this.postsService.getPosts().pipe(
        map(posts => PostsActions.loadPostsSuccess({ posts })),
        catchError(error => of(PostsActions.loadPostsFailure({ error })))
      ))
    );
  });

  loadUserPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.loadUserPosts),
      mergeMap((action) => this.postsService.getPosts(action.userId).pipe(
        map(posts => PostsActions.loadUserPostsSuccess({ posts })),
        catchError(error => of(PostsActions.loadUserPostsFailure({ error })))
      ))
    );
  });

}
