import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from '../service/todo-service.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  animations: [
    trigger('fieldState', [
      state(
        'invalid',
        style({
          backgroundColor: 'rgba(255, 71, 87, 0.03)',
          transform: 'translateX(0)',
        })
      ),
      state(
        'valid',
        style({
          backgroundColor: 'transparent',
          transform: 'translateX(0)',
        })
      ),
      transition('invalid => valid', [
        animate(
          '0.5s ease-out',
          style({
            backgroundColor: 'rgba(40, 167, 69, 0.03)',
          })
        ),
        animate('0.5s'),
      ]),
      transition('valid => invalid', [animate('0.3s ease-in')]),
      transition('void => *', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate('0.4s ease-out'),
      ]),
    ]),
    trigger('buttonState', [
      state(
        'active',
        style({
          transform: 'translateY(0) scale(1)',
          opacity: 1,
        })
      ),
      state(
        'disabled',
        style({
          transform: 'translateY(0) scale(1)',
          opacity: 0.8,
        })
      ),
      transition('active <=> disabled', [animate('0.3s ease-in-out')]),
      transition('void => *', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('0.4s 0.2s ease-out'),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger(100, [
              animate(
                '0.5s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class UpdateComponent implements OnInit {
  todo: any = {};
  todoId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoServiceService
  ) {}

  ngOnInit(): void {
    this.todoId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTodo();
  }
  getFieldState(field: any) {
    return field ? 'valid' : 'invalid';
  }

  loadTodo(): void {
    this.todoService.getATodo(this.todoId).subscribe({
      next: (response) => {
        this.todo = response;
      },
      error: (error) => {
        console.error('Error loading todo:', error);
      },
    });
  }
  cancel() {
    this.router.navigate(['/todos', sessionStorage.getItem('name')], {
      queryParams: { id: sessionStorage.getItem('ID') },
    });
  }

  updateTodo(): void {
    this.todoService.updateTodo(this.todoId, this.todo).subscribe({
      next: () => {
        this.router.navigate(['/todos', sessionStorage.getItem('name')], {
          queryParams: { id: sessionStorage.getItem('ID') },
        });
      },
      error: (error) => {
        console.error('Error updating todo:', error);
      },
    });
  }
}
