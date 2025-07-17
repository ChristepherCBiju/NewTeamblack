import React from "react";
import { Typography, Container, Box, Card, CardContent,Button} from '@mui/material';



const Contact = () => {

    return (
        <div>
          <Container  maxWidth="md" sx={{ mt: 4 }}>
             <Box >
               <Card>
                 <CardContent >
                   <Typography sx={{ mt: 4 }} textAlign={'center'} color='primary' variant='h4'paragraph>
                     Contact Us
                   </Typography>
                   <Typography sx={{ mt: 4 }} textAlign={'center'}  paragraph>
                    contact  ivide kodukuka
                   </Typography>
                  
                 </CardContent>
               </Card>
               
                
             </Box>
             
           </Container>
        </div>
    );
}

export default Contact;