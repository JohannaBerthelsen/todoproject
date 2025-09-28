import { createAction, props } from "@ngrx/store";

export const addTodo = createAction('[Todo] Add', props<{ title: string }>());
export const toggleTodo = createAction('[Todo] Toggle', props<{ id: number }>());
export const removeTodo = createAction('[Todo] Remove', props<{ id: number }>());
export const removeCompletedTodo = createAction('[Todo] Remove Completed');