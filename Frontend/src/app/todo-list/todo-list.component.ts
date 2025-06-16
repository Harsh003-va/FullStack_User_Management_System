import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from '../service/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: any;
  deleteMessage: String = '';
  userId: any;

  uname: string = '';
  constructor(
    private activateRoute: ActivatedRoute,
    private todoService: TodoServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((queryParams) => {
      this.userId = queryParams['id'];
    });
    this.activateRoute.params.subscribe((pathParams) => {
      this.uname = pathParams['name'];
    });
    this.todoService.getAllTodo(this.userId).subscribe({
      next: (successResponse) => {
        console.log(successResponse); //for our confirmation
        this.todos = successResponse;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe({
      next: (successResponse) => {
        console.log(successResponse); //for our confirmation
        this.todos.splice(this.todos.indexOf(todoId), 1);
        this.deleteMessage = 'todo has been deleted';
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateTodo(todoId: string): void {
    this.route.navigate(['/todo/update', todoId]);
  }

  navigateToAddTodo() {
    this.route.navigate(['/todo/add', sessionStorage.getItem('name')]);
  }
}
