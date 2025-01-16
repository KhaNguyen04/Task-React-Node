import axiosInstance from '../../interceptors/axiosInstance';
import { setToDos, addToDo, updateToDo, deleteToDo } from './todo.slice';

// Add a new task thunk
export const createTask = (task) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/todo/tasks', task); // POST request to add a task
    dispatch(addToDo(response.data.task)); // Dispatch the action to add the task to Redux store
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

// Fetch all tasks thunk
export const fetchAllTasks = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/todo/tasks'); // GET request to fetch all tasks
    dispatch(setToDos(response.data.tasks)); // Dispatch the action to set the tasks in Redux store
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }
};

// Update an existing task thunk
export const modifyTask = (task) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/todo/tasks/${task._id}`, task); // PUT request to update the task
    dispatch(updateToDo(response.data.task)); // Dispatch the action to update the task in Redux store
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

// Delete a task thunk
export const removeTask = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/todo/tasks/${id}`); // DELETE request to delete the task
    dispatch(deleteToDo(id)); // Dispatch the action to delete the task from Redux store
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};
