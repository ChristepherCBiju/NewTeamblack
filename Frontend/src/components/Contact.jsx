import React from "react";
import { Typography, Container, Card, CardContent,Link, Button } from '@mui/material';


const Contact = () => {
  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card
          elevation={8}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
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
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Developers 🤖
            </Typography>
            <br /> <Typography>Have a question, comment, or project in mind? Reach out to us using the form below or through the contact details provided. Whether you’re looking for support, collaboration, or just want to say hello, we’re here and ready to help.

Let’s connect!</Typography><br /><br />
            <Typography  textAlign={"start"}>
            1&nbsp;&nbsp;&nbsp;&nbsp;Govind M P&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link color="royalblue" href="https://github.com/Govindprakash07/" target="_" underline="hover">
https://github.com/
</Link>
            </Typography><br />
                   <Typography textAlign={"start"} >
            2&nbsp;&nbsp;&nbsp;&nbsp;Adityadev&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link color="royalblue" href="https://github.com/Adityadevvv" target="_" underline="hover">
https://github.com/
</Link>
            </Typography><br />
                   <Typography textAlign={"start"} >
            3&nbsp;&nbsp;&nbsp;&nbsp;Christepher C Biju &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link color="royalblue" href="https://github.com/ChristepherCBiju" target="_" underline="hover">
https://github.com/
</Link> </Typography><br />
                   <Typography textAlign={"start"} >
            4&nbsp;&nbsp;&nbsp;&nbsp;Aryan CS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link  color="royalblue" href="https://github.com/Vanghostar/" target="_" underline="hover">
https://github.com/
</Link>
            </Typography>
            <br />
                   <Typography textAlign={"start"} >
            5&nbsp;&nbsp;&nbsp;&nbsp;Simson Simon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link color="royalblue" href="https://github.com/simson5002/" target="_" underline="hover">
https://github.com/
</Link>
            </Typography><br /><br />
           
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Contact;
