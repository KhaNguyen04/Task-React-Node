import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/userSlice/user.thunk';
import { Button, TextField, Box, Typography } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const credentials = { username: username, password: password };
    dispatch(loginUser(credentials)); // Dispatch the loginUser thunk
  };

  const goToRegister = () => {
    navigate('/register'); // Navigate to the Register page
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ marginTop: 2 }}>
        Login
      </Button>
      <Button variant="text" onClick={goToRegister} fullWidth sx={{ marginTop: 1 }}>
        Register here
      </Button>
    </Box>
  );
};

export default LoginPage;
