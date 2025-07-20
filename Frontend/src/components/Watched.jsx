import React from 'react';
import { Typography, Container, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Watched = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url('/wall2.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '80px',
      }}
    >
      {/* Blur overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(0.7px)',
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          elevation={6}
          sx={{
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            borderRadius: 3,
            textAlign: 'center',
            mt: 5,
            px: 2,
            py: 4,
          }}
        >
          <CardContent>
            {!user ? (
              <>
                <Typography variant="h6" color="error" gutterBottom>
                  Please log in to see the watch history.
                </Typography>
                <Button
  variant="contained"
  onClick={() => navigate('/login')}
  sx={{
    backgroundColor: 'yellow', 
    color: '#000',               
    '&:hover': {
      backgroundColor: "#FFD700", 
    },
  }}
>
  Go to Login
</Button>

              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom>
                  🎬 Previously Watched
                </Typography>
                <Typography sx={{ color: '#ccc' }}>
                  List of watched content will appear here.
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Watched;
