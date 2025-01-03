import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, IconButton, Checkbox, Modal, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo, deleteTodo, updateTodoStatus, updateTodoData } from '../redux/slices/todoSlice';
import { useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TodoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.todos);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteTodoId, setDeleteTodoId] = React.useState('');

  const [editOpen, setEditOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({
    title: '',
    content: '',
    id: ''
  })

  const [newTask, setNewTask] = useState({
    title: '',
    content: '',
  });
  const [emptyInput, setEmptyInput] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTodos());
    } else {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);


  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.content.trim()) {
      dispatch(createTodo({ title: newTask.title, content: newTask.content, completed: false }));
      setNewTask({
        title: '',
        content: '',
      });
      setEmptyInput(false)
    } else {
      setEmptyInput(true)
    }
  };

  const handleUpdate = () => {
    dispatch(updateTodoData(editData));
    setEditOpen(false)
  }

  const handleDeleteTask = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleStatus = (taskId, currentStatus) => {
    dispatch(updateTodoStatus({ id: taskId, status: !currentStatus }));
  };


  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" onClick={() => { navigate('../') }} gutterBottom style={{ cursor: 'pointer' }}>Todo List</Typography>
      <TextField
        label="title"
        value={newTask.title}
        onChange={(e) => setNewTask((old) => ({ ...old, title: e.target.value }))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="content"
        value={newTask.content}
        onChange={(e) => setNewTask((old) => ({ ...old, content: e.target.value }))}
        fullWidth
        margin="none"
        multiline
        minRows={4}
        maxRows={6}
      />
      {emptyInput && <Typography variant="h6" gutterBottom color='error'>
        Empty Input
      </Typography>}
      <Button variant="contained" onClick={handleAddTask} sx={{ marginBottom: 2 }}>
        Add Task
      </Button>

      <Modal
        open={editOpen}
        onClose={() => { setEditOpen(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="title"
            value={editData.title}
            onChange={(e) => setEditData((old) => ({ ...old, title: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="content"
            value={editData.content}
            onChange={(e) => setEditData((old) => ({ ...old, content: e.target.value }))}
            fullWidth
            margin="none"
            multiline
            minRows={4}
            maxRows={6}
          />

          <Button variant='outlined' color='primary' onClick={()=>{handleUpdate()}}>Update</Button>
        </Box>
      </Modal>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Modal
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Are you sure you want delete this todo?
          </Typography>
          <Button variant='contained' color='error' onClick={() => { handleDeleteTask(deleteTodoId); setDeleteOpen(false) }}>
            Permanently delete
          </Button>
          <Button variant='outlied' color='info' onClick={() => { setDeleteOpen(false) }}>
            Cancel
          </Button>
        </Box>
      </Modal>

      <List>
        {tasks.map((task) => (
          <ListItem key={task._id} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleStatus(task._id, task.completed)}
            />
            <ListItemText primary={task.title} secondary={task.content} />

            <EditIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setEditOpen(true);
                setEditData({
                  title: task.title,
                  content: task.content,
                  id: task._id
                })
              }}
            />
            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => { setDeleteOpen(true); setDeleteTodoId(task._id) }} />

          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoPage;
