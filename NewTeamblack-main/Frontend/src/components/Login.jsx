import React, { useState } from 'react';
import {
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
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

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

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
      if (response.ok) {
        setSuccess('Login successful!');
        const userWithRole = {
          id: data.user.id,
          username: data.user.username,
          role: data.user.role || 'user'
        };
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
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/wall2.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(0.7px)', 
        WebkitBackdropFilter: 'blur(2px)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom textAlign="center" fontWeight={600}>
              Login
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff' } }}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{
                  style: { color: '#fff' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: 'white' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                href="/forgotpassword"
                sx={{
                  mt: 1,
                  mb: 2,
                  textTransform: 'none',
                  color: '#FFEB3B',
                  fontWeight: 500
                }}
              >
                Forgot password?
              </Button>

              <Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    mt: 2,
    backgroundColor: '#FFEB3B',
    color: 'black',
    '&:hover': {
      backgroundColor: '#FDD835'
    }
  }}
>
  Login
</Button>

<Typography textAlign="center" sx={{ mt: 3, fontWeight: 500 }}>
  OR
</Typography>

<Button
  href="/signup"
  fullWidth
  sx={{
    mt: 2,
    color: '#FFEB3B',
    border: '1px solid #FFEB3B',
    
    '&:hover': {
      backgroundColor: 'rgba(255, 235, 59, 0.1)'
    }
  }}
>
  Signup
</Button>

            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
