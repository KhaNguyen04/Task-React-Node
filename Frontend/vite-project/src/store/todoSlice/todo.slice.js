import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setToDos: (state, action) => {
      state.tasks = action.payload;
    },
    addToDo: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateToDo: (state, action) => {
      const index = state.tasks.findIndex((task) => task._id === action.payload._id);

      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteToDo: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export const { setToDos, addToDo, updateToDo, deleteToDo } = todoSlice.actions;
export default todoSlice.reducer;
