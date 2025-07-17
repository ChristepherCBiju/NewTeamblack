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
      <Container  sx={{ mt: 4 }}>
        <Typography style={{textAlign:"center"}} variant='h5' paragraph>
          🎬 Find Your Perfect Movie Match – Instantly!
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          Welcome to our movie recommendation hub – the easiest and most fun way to discover your next favorite film! Whether you're in the mood for a thrilling action movie, a heartwarming romance, a laugh-out-loud comedy, or something totally unexpected, we’ve got you covered.
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          Our platform is designed with simplicity and excitement in mind. Instead of endlessly scrolling through lists or reading reviews, all you have to do is take a short, interactive quiz. The quiz asks a few fun and insightful questions about your mood, preferences, and viewing habits. Based on your responses, our smart recommendation engine selects a movie that perfectly fits your current vibe.
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          But it's not just about what you get – it’s how you get it. We’ve built our site to be incredibly user-friendly, with a sleek, modern interface that makes navigation smooth and enjoyable for everyone. Whether you’re tech-savvy or just looking for a quick pick, you’ll feel right at home here.
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          No complicated filters. No overwhelming options. Just a simple, fun experience that leads you straight to a movie you’ll love.
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          Why You’ll Love It Here:
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary"paragraph>
          🎯 Personalized recommendations through a fun quiz
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          🧠 Intelligent suggestions based on your answers
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          💡 Simple, clean, and intuitive user interface
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          📱 Fully responsive – works beautifully on any device
        </Typography>
        <Typography style={{textAlign:"center"}}  color="text.secondary" paragraph>
          💬 Engaging experience for movie lovers of all kinds
        </Typography>
        <Typography variant='h6' style={{textAlign:"center"}}   paragraph>
          So why wait? Take the quiz, get your result, and hit play. Your next movie night starts here!
        </Typography>
        
      </Container>
      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 4,
          backgroundColor: 'text.secondary',
          display: 'flex',
          justifyContent: 'end',
          gap: 2,
        }}
      >
         <Typography style={{paddingRight:"1000px"}} variant="h4" fontWeight={700} gutterBottom>
          🎬 PopcornPix
        </Typography>
        <Button  color="inherit" href="/about">
          About Us
        </Button>
        <Button  color="inherit" href="/contact">
          Contact
        </Button>&nbsp;
      </Box>
    </Box>
  );
};

export default Home;
