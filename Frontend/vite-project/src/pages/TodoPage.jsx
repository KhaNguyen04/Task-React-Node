import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, fetchAllTasks, modifyTask, removeTask } from '../store/todoSlice/todo.thunk';
import { selectTodos } from '../store/todoSlice/todo.selectors';
import { logoutUser } from '../store/userSlice/user.thunk';
import { Button, TextField, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { selectUser } from '../store/userSlice/user.selectors';
const TodoPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTodos);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(createTask({ name: newTask, complete: false }));
      setNewTask('');
    }
  };

  const handleToggleComplete = (id) => {
    const task = tasks.find((task) => task._id === id);
    if (task) {
      dispatch(modifyTask({ ...task, complete: !task.complete }));
    }
  };

  const handleEditTask = (id, name) => {
    setEditTask(name);
    setEditTaskId(id);
  };

  const handleSaveEditTask = () => {
    if (editTask.trim()) {
      const task = tasks.find((task) => task._id === editTaskId);
      if (task) {
        dispatch(modifyTask({ ...task, name: editTask }));
        setEditTask('');
        setEditTaskId(null);
      }
    }
  };

  const handleCancelEditTask = () => {
    setEditTask('');
    setEditTaskId(null);
  };

  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box >
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      <form onSubmit={handleAddTask}>
      <Box sx={{ display: 'flex', gap: 1,justifyContent:'center' }}>

        <TextField
          label="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{ width: '400px' }} 
        />
        <Button variant="contained" color="primary" type="submit"  size="small">
          Add Task
        </Button>
        </Box>

      </form>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Complete</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell width="10%">
                  <Checkbox
                    checked={task.complete}
                    onChange={() => handleToggleComplete(task._id)}
                  />
                </TableCell>
                <TableCell width="60%">
                  {editTaskId === task._id ? (
                    <TextField
                      fullWidth
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                  ) : (
                    task.name
                  )}
                </TableCell>
                <TableCell width="20%">
                  {editTaskId === task._id ? (
                    <>
                      <Button onClick={handleSaveEditTask} variant="contained" color="primary">
                        Save
                      </Button>
                      <Button onClick={handleCancelEditTask} variant="outlined" color="secondary" sx={{ marginLeft: 1 }}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => handleEditTask(task._id, task.name)} variant="outlined" color="primary">
                      Edit
                    </Button>
                  )}
                </TableCell>
                <TableCell width="10%">
                  <Button onClick={() => handleDeleteTask(task._id)} variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ marginTop: 2 }}>
        Logout
      </Button>
    </Box>
  );
};

export default TodoPage;
