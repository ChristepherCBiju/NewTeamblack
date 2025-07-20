import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiKey = '01251337562f9f301a74af923b7ac9ed';

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );
        setMovies(res.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  };

  if (!movies.length) {
    return (
      <Box textAlign="center" py={3}>
        <Typography variant="body1" color="white">
          {loading ? '🍿 Loading trending movies...' : '❌ No trending movies available.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2 }}>
      <Slider {...settings}>
        {movies.map((movie) => (
          <Box
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            sx={{
              width: '100%',
              maxWidth: '260px',
              height: '340px',
              mx: 1.5,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            {/* Poster Image */}
            <Box
              sx={{
                height: '300px',
                width: '100%',
                borderRadius: 2,
                backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                mb: 1,
              }}
            />

            {/* Title Below Poster */}
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="white"
              textAlign="center"
              noWrap
              sx={{ width: '100%' }}
            >
              {movie.title}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroCarousel;
