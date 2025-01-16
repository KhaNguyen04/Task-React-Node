const express = require('express');
const todoRouter = express.Router();
const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/todoController');
const validateJWT = require('../middlewares/AuthMiddleware');

// POST /tasks: Add a new task
todoRouter.post('/tasks', validateJWT, addTask);

// GET /tasks: Retrieve all tasks for a user
todoRouter.get('/tasks', validateJWT, getAllTasks);

// PUT /tasks/:id: Update a task by ID
todoRouter.put('/tasks/:id', validateJWT, updateTask);

// DELETE /tasks/:id: Delete a task by ID
todoRouter.delete('/tasks/:id', validateJWT, deleteTask);

module.exports = todoRouter;
