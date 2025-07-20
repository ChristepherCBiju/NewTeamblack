import React from "react";
import { Typography, Container, Card, CardContent } from '@mui/material';

const Contact = () => {
  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card
          elevation={8}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
            backdropFilter: 'blur(0.7px)',
            WebkitBackdropFilter: 'blur(0.7px)',
            borderRadius: 4,
            px: 3,
            py: 4,
            color: 'white', 
            textAlign: 'center'
          }}
        >
          <CardContent>
            <Typography variant="h4" color="yellow" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body1">
              contact ivide kodukuka
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Contact;
