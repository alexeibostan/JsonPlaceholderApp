import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}users`;
    return this.http.get<User[]>(url).pipe(
      tap(users => console.log('getUsers', users)),
      switchMap(
        users => forkJoin(users.map(user => this.getUsersPostsLength(user.id)))
        .pipe(
          map( results => users.map( (user, index) => {
              user.userPosts = results[index];
              return user;
            })
          ),
          shareReplay(1)
        )
      ),
      catchError(this.handleError)
    )
  }

  getUsersPostsLength(userId: number): Observable<number> {
    const url = `${this.apiUrl}posts?userId=${userId}`;
    return this.http.get<any[]>(url).pipe(
      tap(posts => console.log('getUsersPostsLength', posts)),
      map(posts => posts.length),
      catchError(this.handleError)
    )
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
