import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';

const Home = ({ user }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(1px)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          🎬 PopcornPix
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover what to watch next based on your mood and favorites.
        </Typography>
        <Box mt={3}>
          {user?.role !== 'admin' && (
            <Button variant="contained" color="primary" size="medium" href="/quiz" sx={{ mr: 1 }}>
              Take the Quiz
            </Button>
          )}
          {!user && (
            <Button variant="outlined" color="primary" href="/login" sx={{ mr: 1 }}>
              Login OR Signup
            </Button>
          )}
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          🔥 Trending Movies
        </Typography>
        <HeroCarousel />
      </Container>

      <Container sx={{ mt: 4 }}>
        <Typography style={{ textAlign: 'center' }} variant="h5" color="yellow" paragraph>
          🎬 Find Your Perfect Movie Match – Instantly!
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="white" paragraph>
          Welcome to our movie recommendation hub – the easiest and most fun way to discover your next favorite film! Whether you're in the mood for a thrilling action movie, a heartwarming romance, a laugh-out-loud comedy, or something totally unexpected, we’ve got you covered.
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="white" paragraph>
          Our platform is designed with simplicity and excitement in mind. Instead of endlessly scrolling through lists or reading reviews, all you have to do is take a short, interactive quiz. The quiz asks a few fun and insightful questions about your mood, preferences, and viewing habits. Based on your responses, our smart recommendation engine selects a movie that perfectly fits your current vibe.
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="white" paragraph>
          But it's not just about what you get – it’s how you get it. We’ve built our site to be incredibly user-friendly, with a sleek, modern interface that makes navigation smooth and enjoyable for everyone. Whether you’re tech-savvy or just looking for a quick pick, you’ll feel right at home here.
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="white" paragraph>
          No complicated filters. No overwhelming options. Just a simple, fun experience that leads you straight to a movie you’ll love.
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="yellow" paragraph>
          Why You’ll Love It Here:
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="white" paragraph>
          🎯 Personalized recommendations through a fun quiz
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="white" paragraph>
          🧠 Intelligent suggestions based on your answers
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="text.primary" paragraph>
          💡 Simple, clean, and intuitive user interface
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="text.primary" paragraph>
          📱 Fully responsive – works beautifully on any device
        </Typography>
        <Typography style={{ textAlign: 'center' }} color="text.primary" paragraph>
          💬 Engaging experience for movie lovers of all kinds
        </Typography>
        <Typography variant="h6" style={{ textAlign: 'center' }} color="yellow" paragraph>
          So why wait? Take the quiz, get your result, and hit play. Your next movie night starts here!
        </Typography>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 5,
          py: 2,
          px: 3,
          backgroundColor: '#000000ff',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px', // matches your content width if you want
            margin: '0 auto',
            px: { xs: 2, sm: 3, md: 6 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'yellow',
            }}
          >
            🎬 PopcornPix
          </Typography>

          <Box>
            <Button component={Link} to="/about" color="primary" sx={{ mr: 1 }}>
              About Us
            </Button>
            <Button component={Link} to="/contact" color="primary">
              Contact
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
