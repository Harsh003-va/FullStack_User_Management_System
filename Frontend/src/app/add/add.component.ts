import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoServiceService } from '../service/todo-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  newTodo: any = {
    name: '',
    description: '',
    price: 0,
    manufactureTime: new Date(),
    expTime: new Date(),
  };

  constructor(private route: Router, private todoService: TodoServiceService) {}

  addTodo(): void {
    this.todoService.createTodo(this.newTodo).subscribe({
      next: (res) => {
        console.log(res);
        this.newTodo = res;
        this.route.navigate(['/todos', sessionStorage.getItem('name')], {
          queryParams: { id: sessionStorage.getItem('ID') },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cancel() {
    this.route.navigate(['/todos', sessionStorage.getItem('name')], {
      queryParams: { id: sessionStorage.getItem('ID') },
    });
  }

  getFieldState(value: any): string {
    return value ? 'filled' : 'empty';
  }
}
