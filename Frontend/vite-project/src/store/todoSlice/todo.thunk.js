import axiosInstance from '../../interceptors/axiosInstance';
import { setToDos, addToDo, updateToDo, deleteToDo } from './todo.slice';

export const createTask = (task) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/todo/tasks', task); 
    dispatch(addToDo(response.data.task)); 
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

export const fetchAllTasks = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/todo/tasks'); 
    dispatch(setToDos(response.data.tasks)); 
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }
};

export const modifyTask = (task) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/todo/tasks/${task._id}`, task); 
    dispatch(updateToDo(response.data.task)); 
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

export const removeTask = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/todo/tasks/${id}`); 
    dispatch(deleteToDo(id)); 
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};
