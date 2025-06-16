import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private userService: UserServiceService
  ) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
    this.userService.registerUser(user).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log('Register button clicked');
  }

  getPasswordStrength(): number {
    if (!this.password) return 0;

    let strength = 0;
    if (this.password.length >= 8) strength += 30;
    if (/[A-Z]/.test(this.password)) strength += 20;
    if (/[0-9]/.test(this.password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(this.password)) strength += 30;

    return Math.min(strength, 100);
  }
}
