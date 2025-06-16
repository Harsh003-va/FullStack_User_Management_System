import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  apiUrl: string = 'http://localhost:8080/users/user';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.users = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      },
    });
  }
}
