import React from 'react';
import { Typography, Container, Box, Card, CardContent, Grid } from '@mui/material';

const Results = () => (
  <Container maxWidth="lg" sx={{ mt: 8 }}>
    <Typography variant="h4" gutterBottom>Recommendations</Typography>
    <Grid container spacing={3}>
      {[1, 2, 3].map(i => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ height: 180, background: '#333', mb: 2 }} />
              <Typography variant="h6">Movie Title</Typography>
              <Typography variant="body2" color="text.secondary">Short description and rating</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default Results;