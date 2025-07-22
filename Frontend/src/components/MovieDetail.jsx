import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Chip, Button, CircularProgress, Stack } from '@mui/material';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = '01251337562f9f301a74af923b7ac9ed';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backdropFilter: 'blur(1px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <CircularProgress color="inherit" />
        <Typography ml={2}>Loading movie...</Typography>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backdropFilter: 'blur(1px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Typography>❌ Movie not found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backdropFilter: 'blur(1px)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: 'white',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '2rem',
      }}
    >
      {/* Movie Poster */}
      <Box sx={{ maxWidth: '300px', flex: '1 1 300px' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%', borderRadius: '12px' }}
        />
      </Box>

      {/* Movie Details */}
      <Box sx={{ flex: 2, minWidth: '300px' }}>
        <Button
          variant="outlined"
          sx={{
            mb: 2,
            color: 'yellow',
            borderColor: 'yellow',
            '&:hover': {
              backgroundColor: 'rgba(255,255,0,0.1)',
            },
          }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <Typography variant="h4" fontWeight={700}>
          {movie.title}
        </Typography>

        <Typography variant="subtitle1" sx={{ color: '#ccc', mb: 1 }}>
          ⭐ Rating: {movie.vote_average} | 🗓 Release: {movie.release_date}
        </Typography>

        {/* Genres */}
        <Stack direction="row" spacing={1} my={1}>
          {movie.genres?.map((genre) => (
            <Chip key={genre.id} label={genre.name} color="primary" />
          ))}
        </Stack>

        {/* Overview */}
        <Typography mt={2} sx={{ lineHeight: 1.6 }}>
          {movie.overview}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieDetail;