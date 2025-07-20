import React from 'react';
import { Typography, Container, Box, Card, CardContent, Button } from '@mui/material';

const About = () => (
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

    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
      <Box>
        <Card
          elevation={5}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            borderRadius: 3,
            p: 3,
          }}
        >
          <CardContent>
            <Typography sx={{ mt: 4 }} textAlign="center" color="yellow" variant="h4" paragraph>
              About Us
            </Typography>

            <Typography sx={{ mt: 4 }} textAlign="center" paragraph>
              We believe movie nights should be exciting, not stressful. We know how overwhelming it can be to scroll endlessly through streaming platforms, trying to decide what to watch. That’s why we set out to create something different — a smarter, more engaging, and truly personalized way to find the perfect movie.
            </Typography>

            <Typography textAlign="center" paragraph color='yellow'>🎯 Our Mission</Typography>
            <Typography textAlign="center" paragraph>
              Our mission is simple: To help people discover movies they’ll love, without the hassle. We combine fun, user interaction with intelligent recommendations to guide users toward films that truly match their mood, interests, and personality — not just what’s trending.
            </Typography>

            <Typography textAlign="center" paragraph color='yellow'>🤖 How It Works</Typography>
            <Typography textAlign="center" paragraph>
              At the core of our platform is an interactive quiz — designed to be short, fun, and surprisingly accurate. Instead of asking you to browse through endless categories, we ask questions about how you're feeling, what kind of experience you're craving, and what kind of stories you enjoy. Then, based on your responses, our system recommends a movie that aligns with your answers.
            </Typography>
            <Typography textAlign="center" paragraph>
              It’s like having a movie-savvy friend who just gets your taste.
            </Typography>

            <Typography textAlign="center" paragraph color='yellow'>🖥️ User Experience First</Typography>
            <Typography textAlign="center" paragraph>
              We’ve built our site with the user in mind every step of the way. From a modern, visually appealing interface to smooth, intuitive navigation, everything is designed to make your experience fast, enjoyable, and frustration-free.
            </Typography>
            <Typography textAlign="center" paragraph>Clean and minimalist design</Typography>
            <Typography textAlign="center" paragraph>Easy-to-use on desktop, tablet, and mobile</Typography>
            <Typography textAlign="center" paragraph>Engaging quiz format for quick recommendations</Typography>
            <Typography textAlign="center" paragraph>No clutter. No ads. Just results.</Typography>

            <Typography textAlign="center" paragraph>
              Whether you're watching alone, with friends, or planning a cozy night in, we’re here to help you make the most of your time and enjoy movies you’ll actually connect with.
            </Typography>

            <Typography textAlign="center" paragraph color='yellow'>💡 Our Story</Typography>
            <Typography textAlign="center" paragraph>
              We’re a small but passionate team of movie enthusiasts, designers, and developers who came together around a shared love for film and a curiosity about how technology could make recommendations smarter — and more fun.
            </Typography>
            <Typography textAlign="center" paragraph>
              We were tired of generic, one-size-fits-all suggestions from streaming platforms. So we started experimenting with quiz-based systems, tested ideas with friends, and slowly built what is now POPCORNPIX.
            </Typography>
            <Typography textAlign="center" paragraph>
              We’re constantly learning, growing, and improving. Every piece of feedback helps us make the site better, and we’re always exploring new features — from user profiles and watchlists, to genre deep-dives and themed quizzes.
            </Typography>

            <Typography textAlign="center" paragraph color='yellow'>🚀 Looking Ahead</Typography>
            <Typography textAlign="center" paragraph>
              Our vision goes beyond just movie recommendations. We want to build a full experience where discovering, watching, and sharing movies becomes something personal and memorable.
            </Typography>
            <Typography textAlign="center" paragraph>
              In the future, we plan to introduce:
            </Typography>
            <Typography textAlign="center" paragraph>Social features to share results and movie lists with friends</Typography>
            <Typography textAlign="center" paragraph>Regularly updated quizzes based on seasonal moods and trends</Typography>
            <Typography textAlign="center" paragraph>Deeper learning algorithms for even more accurate picks</Typography>
            <Typography textAlign="center" paragraph>Integration with streaming platforms to watch movies instantly</Typography>
            <Typography textAlign="center" paragraph>
              We’re just getting started — and we’re glad you’re here for the journey.
            </Typography>

            <Typography textAlign="center" paragraph color='yellow'>🙌 Join Us</Typography>
            <Typography textAlign="center" paragraph>
              Whether you’re a casual viewer, a film fanatic, or just someone who doesn’t want to waste time picking a movie, we’re here to help you find something worth watching. So dive in, take the quiz, and discover a movie that’s just right for you.
            </Typography>
            <Typography textAlign="center" paragraph>
              Thanks for visiting, and happy watching! — The POPCORNPIX Team
            </Typography>

            <Typography textAlign="center" fontWeight={500} sx={{ mt: 6 }}>
              For more valuable information &nbsp;
              <Button variant="outlined" color="primary" href="/contact">
                Contact Us
              </Button>
            </Typography>

          </CardContent>
        </Card>
      </Box>
    </Container>
  </div>
);

export default About;
