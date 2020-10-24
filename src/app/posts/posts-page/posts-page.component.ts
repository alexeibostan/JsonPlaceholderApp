import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/** NgRx */
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../post';
import { loadClientNextPosts, loadClientPrevPosts, loadPosts, loadUserPosts, setCurrentPost } from '../state/posts.actions';
import { getCurrentPost, getPosts, getPostsLength, getVisiblePosts, State } from '../state/posts.reducer';

@Component({
  selector: 'ab-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  posts$: Observable<Post[]>;
  postsLength$: Observable<number>;
  currentPost$: Observable<Post>;
  visiblePosts$: Observable<number>;

  constructor(private store: Store<State>, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.currentPost$ = this.store.select(getCurrentPost);
    this.postsLength$ = this.store.select(getPostsLength);
    this.visiblePosts$ = this.store.select(getVisiblePosts);

    this.route.params.pipe(
      map(p => +p.userId), // Transform string to number
      ).subscribe(userId => {
        if(userId){
          this.store.dispatch(loadUserPosts({ userId }));
        } else {
          this.store.dispatch(loadPosts());
        }
      });
  }

  onSelectPost(post: Post) {
    this.store.dispatch(setCurrentPost({ currentPostId: post.id }));
  }

  nextPosts(){
    this.store.dispatch(loadClientNextPosts());
  }

  prevPosts(){
    this.store.dispatch(loadClientPrevPosts());
  }

}
