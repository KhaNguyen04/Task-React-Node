import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice/user.thunk';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    const userData = { username, password };
    dispatch(registerUser(userData)); // Dispatch the registerUser thunk
  };

  const goToLogIn = () => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Register
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
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
        Password must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ marginTop: 2 }}>
        Register
      </Button>
      <Button variant="text" onClick={goToLogIn} fullWidth sx={{ marginTop: 1 }}>
        Log in here
      </Button>
    </Box>
  );
};

export default RegisterPage;
