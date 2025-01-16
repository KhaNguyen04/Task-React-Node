import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/user.slice';
import todoReducer from './todoSlice/todo.slice';

const store = configureStore({
  reducer: {
    user: userReducer, 
    todos: todoReducer,

  },
});

export default store;
