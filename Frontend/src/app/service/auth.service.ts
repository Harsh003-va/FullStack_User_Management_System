// auth.service.ts
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('Auth_token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('Auth_token');
  }

  logout(): void {
    sessionStorage.clear();
  }
}
