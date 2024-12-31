import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { loginUser } from '../redux/slices/authSlice';
import { Button, TextField, Box, Typography } from '@mui/material';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = () => {
    dispatch(loginUser(credentials));

  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('./../todos') 
    }
  }, [isAuthenticated, navigate]);

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
      {error && <Typography color="error">{error}</Typography>}
      <Button onClick={handleLogin} disabled={loading} variant="contained">
        Login
      </Button>
      <Button onClick={()=>{navigate('../register')}} disabled={loading} variant="contained">
        goto Register
      </Button>
    </Box>
  );
};

export default LoginPage;
