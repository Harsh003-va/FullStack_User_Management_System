// header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  name: string = sessionStorage.getItem('name') || ''; // Get username if exists
  userId: any = sessionStorage.getItem('ID');
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('Auth_token'); // Check sessionStorage
  }

  logout(): void {
    // Clear all session storage items
    sessionStorage.removeItem('Auth_token');
    sessionStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}
