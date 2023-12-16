import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss']
})
export class TodoPage {
  todos: any[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {
    this.todos = todoService.getTodos();
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = '';
  }

  updateTodo(id: number, newText: any) {
    this.todoService.updateTodo(id, newText);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
