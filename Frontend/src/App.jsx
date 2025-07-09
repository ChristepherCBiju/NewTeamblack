import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import '@fontsource/playfair-display';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import Navbar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Watched from './components/Watched';
import AdminDashboard from './components/AdminDashboard';
import HeroCarousel from './components/HeroCarousel';
import MovieDetail from './components/MovieDetail';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f0e130', 
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#0e0e0e',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#999',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default function App() {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> 
        
          <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
