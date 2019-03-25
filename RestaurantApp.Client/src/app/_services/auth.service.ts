import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'https://localhost:44323/api/accounts/';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getTokenExpirationDate(): Date {
    const decoded = jwt_decode(this.getToken());

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  get isTokenExpired(): boolean {
    const date = this.getTokenExpirationDate();
    if (date === undefined) return false;

    return !!(date.valueOf() > new Date().valueOf());
  }

  get isAuthanticated(): boolean {
    return !!(this.getToken() && this.isTokenExpired);
  }

  get currentUser() {
    let token = this.getToken();
    if(!token) return null;

    return jwt_decode(token);
  }

  register(user: User) {
    return this.http.post<any>(this.url + 'register', user);
  }

  login(user: User) {
    return this.http.post<any>(this.url + 'login', user);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
