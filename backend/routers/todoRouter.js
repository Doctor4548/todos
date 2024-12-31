const express = require('express');
const todoRouter = express.Router();
const {authMiddleware} = require('../middleWare/authMiddleware.js')
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController.js');

todoRouter.post('/tasks', authMiddleware, createTodo); 
todoRouter.get('/tasks', authMiddleware, getTodos); 
todoRouter.put('/tasks/:id', authMiddleware, updateTodo); 
todoRouter.delete('/tasks/:id', authMiddleware, deleteTodo); 

module.exports = todoRouter