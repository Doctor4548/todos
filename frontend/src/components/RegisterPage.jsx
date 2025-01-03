import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isStrongPassword, isAlphanumeric } from 'validator'

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [validationError, setValidationError] = useState('');

  const [userDetails, setUserDetails] = useState({ username: '', password: '', confirmPassword: '' });

  const handleRegister = () => {
    if (!isStrongPassword(userDetails.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      setValidationError(
        'Password must be at least 8 characters long, and include uppercase, lowercase, numbers, and symbols.'
      );
      return ;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      setValidationError('Passwords do not match!');
      return;
    }

    if (!isAlphanumeric(userDetails.username) || userDetails.username.length < 3 || userDetails.username.length > 15) {
      setValidationError('Username must be alphanumeric and between 3-15 characters.');
      return;
    }


    setValidationError('')

    dispatch(registerUser({userDetails, navigate}));
    //navigate('/login');
    
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
      {validationError && <Typography color="error">{validationError}</Typography>}
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
