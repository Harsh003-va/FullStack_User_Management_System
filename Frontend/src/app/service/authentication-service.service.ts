import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
declare const ApiUrl: String;
@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  constructor(private http: HttpClient) {}

  handleBEAuthentication(postData: any) {
    return this.http
      .post(ApiUrl + 'login', postData, {
        headers: { 'Content-Type': 'application/json' },
        observe: 'response',
      })
      .pipe(
        map((data) => {
          const token = data.headers.get('Authorization');
          if (token) {
            sessionStorage.setItem('Auth_token', token);
            sessionStorage.setItem('ID', data.headers.get('id') || '');
            sessionStorage.setItem('name', data.headers.get('username') || '');
          }
          return data;
        })
      );
  }

  isLoggedIn() {
    return sessionStorage.getItem('Auth_token');
  }

  isAuthenticationTokenAvailable(): string | null {
    if (this.isLoggedIn()) {
      return sessionStorage.getItem('Auth_token');
    }
    return null;
  }
}
