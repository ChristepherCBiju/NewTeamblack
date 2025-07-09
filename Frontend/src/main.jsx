import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
  palette: {
    mode: 'dark', 
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
