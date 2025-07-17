import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Button,
  CircularProgress
} from "@mui/material";
import axios from "axios";

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState("");
  const [company, setCompany] = useState("");
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [releaseRange, setReleaseRange] = useState("");
  const [occasion, setOccasion] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allGenres = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance"];
  const allRatings = ["G", "PG", "PG-13", "R", "NC-17"];

  const handleGenreChange = (genre) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleRatingChange = (rating) => {
    setRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setRecommendations([]);
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        mood,
        company,
        genres: genres.join(","), // Convert arrays to comma-separated strings
        ratings: ratings.join(","),
        releaseRange,
        occasion,
      });

      const result = response.data.recommendation;

      if (Array.isArray(result)) {
        setRecommendations(result);
      } else {
        setRecommendations([result]);
      }
    } catch (err) {
      setError("⚠️ Failed to fetch recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Movie Preference Quiz
          </Typography>

          {/* Steps */}
          {step === 0 && (
            <FormControl fullWidth margin="normal">
              <FormLabel>What's your current mood?</FormLabel>
              <RadioGroup value={mood} onChange={(e) => setMood(e.target.value)}>
                <FormControlLabel value="happy" control={<Radio />} label="Happy" />
                <FormControlLabel value="sad" control={<Radio />} label="Sad" />
                <FormControlLabel value="chill" control={<Radio />} label="Chill" />
                <FormControlLabel value="thrilled" control={<Radio />} label="Thrilled" />
              </RadioGroup>
            </FormControl>
          )}

          {step === 1 && (
            <FormControl fullWidth margin="normal">
              <FormLabel>Who are you watching with?</FormLabel>
              <RadioGroup value={company} onChange={(e) => setCompany(e.target.value)}>
                <FormControlLabel value="alone" control={<Radio />} label="Alone" />
                <FormControlLabel value="partner" control={<Radio />} label="Partner" />
                <FormControlLabel value="friends" control={<Radio />} label="Friends" />
                <FormControlLabel value="family" control={<Radio />} label="Family" />
                <FormControlLabel value="kids" control={<Radio />} label="Kids" />
              </RadioGroup>
            </FormControl>
          )}

          {step === 2 && (
            <FormControl fullWidth margin="normal">
              <FormLabel>Select your preferred genres</FormLabel>
              <FormGroup>
                {allGenres.map((genre) => (
                  <FormControlLabel
                    key={genre}
                    control={
                      <Checkbox
                        checked={genres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                    }
                    label={genre}
                  />
                ))}
              </FormGroup>
            </FormControl>
          )}

          {step === 3 && (
            <FormControl fullWidth margin="normal">
              <FormLabel>Select MPAA ratings you're okay with</FormLabel>
              <FormGroup>
                {allRatings.map((rating) => (
                  <FormControlLabel
                    key={rating}
                    control={
                      <Checkbox
                        checked={ratings.includes(rating)}
                        onChange={() => handleRatingChange(rating)}
                      />
                    }
                    label={rating}
                  />
                ))}
              </FormGroup>
            </FormControl>
          )}

          {step === 4 && (
            <FormControl fullWidth margin="normal">
              <FormLabel>Preferred movie release range</FormLabel>
              <RadioGroup value={releaseRange} onChange={(e) => setReleaseRange(e.target.value)}>
                <FormControlLabel value="recent" control={<Radio />} label="2015–Now" />
                <FormControlLabel value="mid" control={<Radio />} label="2000–2015" />
                <FormControlLabel value="older" control={<Radio />} label="1980–2000" />
                <FormControlLabel value="classic" control={<Radio />} label="Before 1980" />
              </RadioGroup>
            </FormControl>
          )}

          {step === 5 && (
            <FormControl fullWidth margin="normal">
              <FormLabel>What's the occasion?</FormLabel>
              <RadioGroup value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                <FormControlLabel value="casual" control={<Radio />} label="Just a casual watch" />
                <FormControlLabel value="party" control={<Radio />} label="Movie night / Party" />
                <FormControlLabel value="date" control={<Radio />} label="Date night" />
                <FormControlLabel value="holiday" control={<Radio />} label="Holiday / Seasonal" />
                <FormControlLabel value="birthday" control={<Radio />} label="Birthday" />
                <FormControlLabel value="me-time" control={<Radio />} label="Self-care / Me-time" />
              </RadioGroup>
            </FormControl>
          )}

          {/* Navigation Buttons */}
          <div style={{ marginTop: 24 }}>
            {step > 0 && (
              <Button onClick={() => setStep((prev) => prev - 1)} sx={{ mr: 2 }}>
                Back
              </Button>
            )}
            {step < 5 ? (
              <Button
                variant="contained"
                onClick={() => setStep((prev) => prev + 1)}
                disabled={
                  (step === 0 && !mood) ||
                  (step === 1 && !company) ||
                  (step === 2 && genres.length === 0) ||
                  (step === 3 && ratings.length === 0) ||
                  (step === 4 && !releaseRange)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!occasion || loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
              </Button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* Recommendations Display */}
          {recommendations.length > 0 && (
            <div style={{ marginTop: 30 }}>
              <Typography variant="h6">🎬 Recommended Movies:</Typography>
              {recommendations.map((movie, index) => (
                <Typography key={index}>• {movie}</Typography>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Quiz;
