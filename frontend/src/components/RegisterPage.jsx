import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({ username: '', password: '', confirmPassword: '' });

  const handleRegister = () => {
    if (userDetails.password !== userDetails.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    dispatch(registerUser(userDetails));
    navigate('/login');
  };


  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField
        label="Username"
        value={userDetails.username}
        onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={userDetails.password}
        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={userDetails.confirmPassword}
        onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        onClick={handleRegister}
        disabled={loading}
        variant="contained"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
      </Button>
    </Box>
  );
};

export default RegisterPage;
