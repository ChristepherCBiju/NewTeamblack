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
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography color="white">Loading movie...</Typography>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="white">❌ Movie not found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      p={3}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        flexWrap: 'wrap',
        color: 'white',
      }}
    >
      {/* Poster */}
      <Box sx={{ maxWidth: '300px' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%', borderRadius: '12px' }}
        />
      </Box>

      {/* Details */}
      <Box sx={{ flex: 1 }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mb: 2, alignSelf: 'flex-start' }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <Typography variant="h4" fontWeight={700}>
          {movie.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          ⭐ Rating: {movie.vote_average} | 🗓 Release: {movie.release_date}
        </Typography>

        {/* Genres */}
        <Stack direction="row" spacing={1} my={1}>
          {movie.genres?.map((genre) => (
            <Chip key={genre.id} label={genre.name} color="primary" />
          ))}
        </Stack>

        {/* Overview */}
        <Typography mt={2}>{movie.overview}</Typography>
      </Box>
    </Box>
  );
};

export default MovieDetail;
