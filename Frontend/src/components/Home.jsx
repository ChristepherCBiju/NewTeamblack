import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import HeroCarousel from '../components/HeroCarousel';

const Home = ({ user }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0e0e0e, #1a1a1a)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 2,
        py: 4,
      }}
    >
      {/* 🎬 Branding + Buttons */}
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          🎬 PopcornPix
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover what to watch next based on your mood and favorites.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" size="medium" href="/quiz" sx={{ mr: 1 }}>
            Take the Quiz
          </Button>
          {!user && (
            <Button variant="outlined" color="primary" href="/login" sx={{ mr: 1 }}>
              Login OR Signup
            </Button>
          )}
        </Box>
      </Container>

      {/* 🔥 Trending Movies Title + Carousel */}
      <Container maxWidth="xl" sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          🔥 Trending Movies
        </Typography>
        <HeroCarousel />
      </Container>
    </Box>
  );
};

export default Home;
