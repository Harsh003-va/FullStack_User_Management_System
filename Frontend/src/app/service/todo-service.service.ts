import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare const TodoUrl: String;
@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  constructor(private http: HttpClient) {}

  getAllTodo(userId: string) {
    const params = new HttpParams();
    params.set('userId', userId);
    return this.http.get(TodoUrl + 'getAllTodo/' + userId);
  }

  deleteTodo(todoId: string): Observable<any> {
    return this.http.delete(TodoUrl + 'delete/' + todoId);
  }

  getATodo(todoId: string): Observable<any> {
    return this.http.get(TodoUrl + 'getTodo/' + todoId);
  }

  updateTodo(id: string, objTodo: any) {
    return this.http.put(TodoUrl + 'update/' + id, JSON.stringify(objTodo), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  createTodo(objTodo: any) {
    return this.http.post(TodoUrl + 'addTodo', JSON.stringify(objTodo), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
