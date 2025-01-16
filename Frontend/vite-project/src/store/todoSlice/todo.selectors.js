import { createSelector } from 'reselect';

const selectTodosState = (state) => state.todos;

export const selectTodos = createSelector(
  [selectTodosState], 
  (todosState) => todosState.tasks 
);
