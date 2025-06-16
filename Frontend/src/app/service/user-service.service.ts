import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = 'http://localhost:8080/users/createUser';
  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http
      .post(this.apiUrl, user, {
        observe: 'response',
      })
      .pipe((data) => {
        return data;
      });
  }
}
