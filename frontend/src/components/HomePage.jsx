import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logoutUser} from '../redux/slices/authSlice.js'

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome to the Todo App</Typography>
      <Button variant="contained" onClick={() => navigate('/todos')} sx={{ marginBottom: 2 }}>
        Go to Todo List
      </Button>
      <Button variant="contained" onClick={() => dispatch(logoutUser())} sx={{ marginBottom: 2 }}>
        Logout
      </Button>
    </Box>
  );
};

export default HomePage;
