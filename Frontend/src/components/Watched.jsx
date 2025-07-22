import React, { useState, useEffect } from 'react';
import { Typography, Container, Card, CardContent, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Watched = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchWatched();
    }
  }, [user]);

  const fetchWatched = async () => {
    try {
      const response = await fetch(`http://localhost:3030/watched/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch watched list');
      }
      const data = await response.json();
      setWatchedMovies(data.watched || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch watched list');
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDialog = () => {
    setSelectedMovie(null);
  };

  if (!user) {
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
                    backgroundColor: '#FFD700',
                  },
                }}
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(0.7px)',
          zIndex: 0,
        }}
      />
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>
          🎬 Watch List 
        </Typography>
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {watchedMovies.length === 0 ? (
          <Typography sx={{ color: '#ccc' }}>No watched movies found.</Typography>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'rgba(0,0,0,0.6)', borderRadius: 2 }}>
            {[...watchedMovies].reverse().map((movie, index, arr) => (
              <ListItem
                button
                key={movie.id || movie._id || index}
                onClick={() => handleMovieClick(movie)}
                sx={{ borderBottom: '1px solid #444', display: 'flex', alignItems: 'center' }}
              >
                {movie.poster_path && (
                  <CardMedia
                    component="img"
                    image={movie.poster_path}
                    alt={movie.title}
                    sx={{ width: 60, height: 90, borderRadius: 1, mr: 2 }}
                  />
                )}
                <ListItemText
                  primary={`${arr.length - index}. ${movie.title || movie.name || 'Untitled'}`}
                  sx={{ color: '#fff' }}
                />
              </ListItem>
            ))}
          </List>
        )}

        {/* Movie Detail Dialog */}
        <Dialog
          open={Boolean(selectedMovie)}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 1)',
              color: '#fff',
              padding: 3,
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
            {selectedMovie?.title || selectedMovie?.name || 'Movie Details'}
          </DialogTitle>
          <DialogContent dividers sx={{ fontSize: '1.2rem', lineHeight: 1.6, display: 'flex', flexDirection: 'row', gap: 3 }}>
            {selectedMovie?.poster_path && (
              <CardMedia
                component="img"
                image={selectedMovie.poster_path}
                alt={selectedMovie.title}
                sx={{ width: 150, height: 225, borderRadius: 2 }}
              />
            )}
            <Typography variant="body1" gutterBottom sx={{ flex: 1 }}>
              {selectedMovie?.overview || 'No description available.'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: '#fff' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Watched;
