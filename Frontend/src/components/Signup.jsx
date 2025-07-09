import React, { useState } from 'react';
import { Typography, Container, Card, CardContent, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      setError('Please enter a valid email address');
      return;
    }

  
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    try {
      const response = await fetch('http://localhost:3030/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, mail, phone, gender }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Signup successful!');
        setUsername('');
        setPassword('');
        setMail('');
        setPhone('');
        setGender('');
      } else {
        setError(data.error || 'Signup failed');
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
            Signup
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField label="Username" variant="outlined" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
            <TextField label="Email" variant="outlined" fullWidth margin="normal" value={mail} onChange={(e) => setMail(e.target.value)} required />
            <TextField label="Phone" variant="outlined" fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Signup
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;






