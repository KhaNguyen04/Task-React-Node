const express = require('express');
const todoRouter = express.Router();
const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/todoController');
const validateJWT = require('../middlewares/AuthMiddleware');

todoRouter.post('/tasks', validateJWT, addTask);

todoRouter.get('/tasks', validateJWT, getAllTasks);

todoRouter.put('/tasks/:id', validateJWT, updateTask);

todoRouter.delete('/tasks/:id', validateJWT, deleteTask);

module.exports = todoRouter;
