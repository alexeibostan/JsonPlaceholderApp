import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'ab-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() users: User[];
  @Input() selectedUser: User | null;

  @Output() selected = new EventEmitter<User>();
  @Output() post = new EventEmitter<User>();
  @Output() loadUserPosts = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  trackByUserId(user: User) : number {
    return user.id;
  }

}
