import React from 'react';
import { Typography, Container, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Watched = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" color="error" gutterBottom>
              Please log in to see the watch history.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>Previously Watched</Typography>
          <Typography>List of watched content</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Watched;
