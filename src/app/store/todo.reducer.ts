import { createReducer, on } from "@ngrx/store";
import { Todo } from "../models/todo.model";
import * as TodoActions from "./todo.actions";

//Load current state
const savedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
let lastId = Number(localStorage.getItem('lastId') || '0');

//define the state interface
export interface TodoState {
    todos: Todo[];
}

//Current state
export const currentState: TodoState = {
    todos: savedTodos
};

//generating incremental id numbers
function getNextId(): number {
    lastId +=1;
    localStorage.setItem('lastId', lastId.toString());
    return lastId;
}

export const todoReducer = createReducer(
    currentState,

    //add a new todo
    on(TodoActions.addTodo, (state, { title }) => {
        const newTodo: Todo = { id:getNextId(), title, completed: false };
        const updatedTodos = [...state.todos, newTodo];

        // save updated todos to localStorage
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return {
            ...state,
            todos: updatedTodos,
        };
    }),

    //Toggle completed status
    on(TodoActions.toggleTodo, (state, { id }) =>{
        const updatedTodos = state.todos.map( todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);

        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        return {
            ...state,
            todos: updatedTodos,
        };
    }),
    on(TodoActions.removeTodo, (state, { id }) => {
        const updatedTodos = state.todos.filter(todo => todo.id !== id);

        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        return {
            ...state,
            todos: updatedTodos,
        };
    }),

    //remove completed todos
    on(TodoActions.removeCompletedTodo, state => {
        const updatedTodos = state.todos.filter(todo => !todo.completed);

        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        return {
            ...state,
            todos: updatedTodos,
        };
    })
);