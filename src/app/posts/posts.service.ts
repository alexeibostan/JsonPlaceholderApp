import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from './post';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class PostsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPosts(userId?: number): Observable<Post[]> {
    const url = `${this.apiUrl}posts`;
    let params = new HttpParams();
    if(userId){
      params = params.set('userId', userId.toString());
    }
    const httpOptions = {
      params
    };
    return this.http.get<Post[]>(url, httpOptions).pipe(
      tap(posts => console.log('getPosts', posts)),
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
