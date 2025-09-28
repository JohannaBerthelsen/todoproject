import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const selectTodoState = (state: TodoState ) => state.todos;

export const selectTodos = createSelector(
        selectTodoState,
        todos => todos
);

export const selectCompletedCount = createSelector(
    selectTodos,
    todos => todos.filter(todo => todo.completed).length
);

export const selectedRaminingCount = createSelector(
    selectTodos,
    todos => todos.filter(todo => !todo.completed).length
);