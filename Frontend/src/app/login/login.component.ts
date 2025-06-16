import { Component, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100px)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100px)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('floatIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate(
          '400ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('pulse', [
      transition(':enter', [
        animate(
          '1s ease-in-out',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.05)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('100ms', [animate('300ms ease-out', style({ opacity: 1 }))]),
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class LoginComponent {
  isLoginSucess: boolean = true;
  userId: any = '';
  name: any = '';
  email = '';
  password = '';

  constructor(
    private route: Router,
    private authService: AuthenticationServiceService
  ) {}

  handleLogin() {
    const postData = {
      email: this.email,
      password: this.password,
    };

    this.authService.handleBEAuthentication(postData).subscribe({
      next: (successResponse: any) => {
        console.log(successResponse.headers.get('user_id'));
        this.userId = sessionStorage.getItem('ID');
        this.name = sessionStorage.getItem('name');

        this.route.navigate(['/welcome', this.name], {
          queryParams: { id: this.userId },
        });
      },
      error: (errorValue: any) => {
        console.log(errorValue);

        this.isLoginSucess = !this.isLoginSucess;
        this.route.navigate(['/error']);
      },
    });
  }
}
