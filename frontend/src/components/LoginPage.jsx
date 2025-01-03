import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { loginUser } from '../redux/slices/authSlice';
import { Button, TextField, Box, Typography } from '@mui/material';
import { isStrongPassword, isAlphanumeric } from 'validator'

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [validationError, setValidationError] = useState('')
  const handleLogin = () => {

    if (!isStrongPassword(credentials.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      setValidationError(
        'Password must be at least 8 characters long, and include uppercase, lowercase, numbers, and symbols.'
      );
      return;
    }

    if (!isAlphanumeric(credentials.username) || credentials.username.length < 3 || credentials.username.length > 15) {
      setValidationError('Username must be alphanumeric and between 3-15 characters.');
      return;
    }
    setValidationError('')
    dispatch(loginUser({credentials, navigate}));

  };



  return (
    <Box>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        fullWidth
      />
      {validationError && <Typography color="error">{validationError}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Button onClick={handleLogin} disabled={loading} variant="contained">
        Login
      </Button>
      <Button onClick={() => { navigate('../register') }} disabled={loading} variant="contained">
        goto Register
      </Button>
    </Box>
  );
};

export default LoginPage;
