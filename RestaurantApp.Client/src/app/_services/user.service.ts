import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = 'https://localhost:44323/api/users/';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.url).pipe(map(result => result));
  }

  getUser(id: any) {
    return this.http.get<any>(this.url + id).pipe(map(result => result));
  }

  putUser(id: any, user: User) {
    return this.http.put<any>(this.url + id, user).pipe(map(result => result));
  }
}
