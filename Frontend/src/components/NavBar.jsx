import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  IconButton
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    if (user) {
      fetchWatched();
    }

    // Listen for watched list update events
    const handleWatchedListUpdated = () => {
      fetchWatched();
    };
    window.addEventListener('watchedListUpdated', handleWatchedListUpdated);

    return () => {
      window.removeEventListener('watchedListUpdated', handleWatchedListUpdated);
    };
  }, [user]);

  const fetchWatched = async () => {
    try {
      const response = await fetch(`http://localhost:3030/watched/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch watched list');
      }
      const data = await response.json();
      setWatched(data.watched);
      setError('');
    } catch (err) {
      setError('Failed to fetch watched list');
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3030/users');
      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleRemoveUser = async (username) => {
    if (!window.confirm(`Are you sure you want to remove user "${username}"?`)) return;
    try {
      const response = await fetch('http://localhost:3030/remove-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchUsers();
      } else {
        setError(data.error || 'Failed to remove user');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  // Expose fetchWatched to be called externally to refresh watched list
  const refreshWatched = () => {
    fetchWatched();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Do you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#0e0e0e', py: 2, borderBottom: '1px solid #333' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          component={Link}
          to="/"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'light-yellow',
            backgroundColor: '#000',
            px: 2,
            py: 1,
            borderRadius: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#111',
            },
          }}
        >
          🍿 PopcornPix
        </Button>

        <Box>
          <Button component={Link} to="/" color="primary">Home</Button>
          {user?.role !== "admin" && (
            <>
              <Button component={Link} to="/quiz" color="primary">Quiz</Button>
              <Button component={Link} to="/watched" color="primary">Watch list</Button>
            </>
          )}
          <Button component={Link} to="/about" color="primary">About</Button>
          {user && user.role === "admin" && (
            <>
              <Button component={Link} to="/admin" color="primary">Admin</Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    maxHeight: 300,
                    width: '30ch',
                  },
                }}
              >
                {error && <MenuItem disabled>{error}</MenuItem>}
                {users.length === 0 && !error && <MenuItem disabled>No users found.</MenuItem>}
                {users.map((userItem) => (
                  <MenuItem key={userItem._id} disabled={userItem.username === 'admin'}>
                    <ListItemText primary={userItem.username} secondary={userItem.mail} />
                    {userItem.username !== 'admin' && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveUser(userItem.username)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
          {user ? (
            <Button onClick={handleLogout} color="primary">Logout</Button>
          ) : (
            <Button component={Link} to="/login" color="primary">Login</Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
