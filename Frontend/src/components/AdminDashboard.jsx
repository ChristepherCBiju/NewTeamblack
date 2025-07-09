import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, Button, Snackbar, Alert, Box } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3030/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async (username) => {
    try {
      await axios.post('http://localhost:3030/remove-user', { username });
      setMessage(`User ${username} removed successfully`);
      setOpenSnackbar(true);
      fetchUsers();
    } catch (err) {
      setError('Failed to remove user');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setMessage('');
    setError('');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        Admin Dashboard
      </Typography>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '300px',
            padding: '8px 12px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </Box>
      {loading ? (
        <Typography sx={{ textAlign: 'center' }}>Loading users...</Typography>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
          gap={3}
          sx={{ px: 2 }}
        >
          {filteredUsers.map((user) => (
            <Card
              key={user._id}
              elevation={8}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                  {user.username}
                </Typography>
                <Typography sx={{ mb: 0.5 }}>Email: {user.mail}</Typography>
                <Typography sx={{ mb: 0.5 }}>Phone: {user.phone || '-'}</Typography>
                <Typography sx={{ mb: 0.5 }}>Gender: {user.gender || '-'}</Typography>
                <Typography sx={{ mb: 1, fontStyle: 'italic' }}>Role: {user.role}</Typography>
              </Box>
              {user.role !== 'admin' && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveUser(user.username)}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Remove User
                </Button>
              )}
            </Card>
          ))}
        </Box>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        {message ? (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard;
