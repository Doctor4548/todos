import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo, deleteTodo, updateTodoStatus } from '../redux/slices/todoSlice';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.todos);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [newTask, setNewTask] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTodos());
    } else {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  console.log(loading)

  const handleAddTask = () => {
    if (newTask.title.trim() &&newTask.content.trim()) {
      dispatch(createTodo({ title: newTask.title, content: newTask.content, completed: false }));
      setNewTask({
        title: '',
        content: '',
      });
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleStatus = (taskId, currentStatus) => {
    dispatch(updateTodoStatus({ id: taskId, status: !currentStatus }));
  };
  

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Todo List</Typography>
      <TextField
        label="title"
        value={newTask.title}
        onChange={(e) => setNewTask((old)=>({...old, title: e.target.value}))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="content"
        value={newTask.content}
        onChange={(e) => setNewTask((old)=>({...old, content: e.target.value}))}
        fullWidth
        margin="none"
      />
      <Button variant="contained" onClick={handleAddTask} sx={{ marginBottom: 2 }}>
        Add Task
      </Button>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {tasks.map((task) => (
          <ListItem key={task._id} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleStatus(task._id, task.completed)}
            />
            <ListItemText primary={task.title} secondary={task.content} />
              <Button onClick={() => handleDeleteTask(task._id)} color="error">Delete</Button>
            <IconButton color="primary">
              <Button />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoPage;
