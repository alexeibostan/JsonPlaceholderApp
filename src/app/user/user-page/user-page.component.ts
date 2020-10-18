import { Component, OnInit } from '@angular/core';
/** NgRx */
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentUser, getUsers, State } from '../state/user.reducer';
import { User } from '../user';
import { loadUsers, setCurrentUsers } from '../state/user.actions';

@Component({
  selector: 'ab-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users$: Observable<User[]>;
  currentUser$: Observable<User>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.users$ = this.store.select(getUsers);
    this.currentUser$ = this.store.select(getCurrentUser);

    this.store.dispatch(loadUsers());
  }

  onSelectedUser(user: User) {
    this.store.dispatch(setCurrentUsers({currentUserId: user.id}));
  }

}
