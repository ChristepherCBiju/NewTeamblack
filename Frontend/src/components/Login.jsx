import React, { useState } from 'react';
import { Typography, Container, Card, CardContent, TextField, Button, Box, Alert, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({ setUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:3030/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, password }),
      });
      const data = await response.json();
      console.log('Login response user:', data.user);
      if (response.ok) {
        setSuccess('Login successful!');
      
        const userWithRole = {
          id: data.user.id,
          username: data.user.username,
          role: data.user.role || 'user'
        };
        console.log('User with role:', userWithRole);
        localStorage.setItem('user', JSON.stringify(userWithRole));
        setUser(userWithRole);
        navigate('/'); 
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField label="Username" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button color="primary">
              Forgot password?
            </Button>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
            <br /><br />
            <Typography style={{ paddingLeft: "47.5%" }}>OR</Typography>
            <Button href="/signup" color="primary" fullWidth sx={{ mt: 2 }}>
              Signup
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
