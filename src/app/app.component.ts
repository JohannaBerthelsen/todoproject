import { Component } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodoState } from './store/todo.reducer';
import { Store } from '@ngrx/store';
import { selectTodos } from './store/todo.selectors';
import * as TodoActions from "./store/todo.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todos: Todo[] = [];

  constructor(private store: Store<TodoState>){
    this.store.select(selectTodos).subscribe(todos => this.todos = todos);
  }

  add(title: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: title,
      completed: false
    };
    this.store.dispatch(TodoActions.addTodo({ title }));
  }

  toggle(id: number){
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  remove(id: number){
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }

  removeCompleted(){
    this.store.dispatch(TodoActions.removeCompletedTodo());
  }
}
