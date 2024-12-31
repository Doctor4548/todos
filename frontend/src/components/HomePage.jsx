import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome to the Todo App</Typography>
      <Button variant="contained" onClick={() => navigate('/todos')} sx={{ marginBottom: 2 }}>
        Go to Todo List
      </Button>
    </Box>
  );
};

export default HomePage;
