import React, { useState, useEffect } from 'react';
import { Box, Container, Button, Typography, Menu, MenuItem, ListItemText, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

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
        <Typography variant="h5" color="primary" fontWeight={700}>🍿 PopcornPix</Typography>
        <Box>
          <Button component={Link} to="/" color="primary">Home</Button>
          <Button component={Link} to="/quiz" color="primary">Quiz</Button>
          <Button component={Link} to="/watched" color="primary">Watched</Button>
          {user && user.role === "admin" && (
            <>
              <Button
                component={Link} to="/admin" color="primary"
              >
                Admin
              </Button>
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
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveUser(userItem.username)}>
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
