import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container, Card, CardContent, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Watched = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      let parsedUser;
      try {
        parsedUser = JSON.parse(user);
      } catch {
        parsedUser = null;
      }
      if (parsedUser && parsedUser.username) {
        setLoading(true);
        axios.get(`http://localhost:3030/watched/${parsedUser.username}`)
          .then(response => {
            setWatchedMovies(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError('Failed to load watched movies');
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

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
            ) : loading ? (
              <Typography sx={{ color: '#ccc' }}>
                Loading watched movies...
              </Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : watchedMovies.length === 0 ? (
              <Typography sx={{ color: '#ccc' }}>
                List of watched content will appear here.
              </Typography>
            ) : (
              <List>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Watched Movies
                </Typography>
                {watchedMovies.length === 0 ? (
                  <Typography sx={{ color: '#ccc', mb: 2 }}>
                    No movies
                  </Typography>
                ) : (
                  <List>
                    {watchedMovies.map((movie, index) => (
                      <ListItem key={index} divider>
                        <ListItemText primary={`${index + 1}. ${movie.title || movie.name || 'Untitled Movie'}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </List>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Watched;
