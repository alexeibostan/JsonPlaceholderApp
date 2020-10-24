import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { User } from '../user';

/** NgRx */
import { Store } from '@ngrx/store';
import { getCurrentUser, getUsers, State } from '../state/user.reducer';
import { loadUsers, setCurrentUsers, loadUsersPostsLength } from '../state/user.actions';


@Component({
  selector: 'ab-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users$: Observable<User[]>;
  currentUser$: Observable<User>;

  constructor(private store: Store<State>, private router: Router) { }

  ngOnInit(): void {
    this.users$ = this.store.select(getUsers);
    this.currentUser$ = this.store.select(getCurrentUser);

    this.store.dispatch(loadUsers());
  }

  onSelectedUser(user: User) {
    this.store.dispatch(setCurrentUsers({currentUserId: user.id}));
  }

  onLoadUserPosts(userId: number){
    this.store.dispatch(loadUsersPostsLength({userId}));
  }

  goToPostsPage(user: User){
    this.store.dispatch(setCurrentUsers({currentUserId: user.id}));
    this.router.navigateByUrl(`/posts/${user.id}`)
  }

}
