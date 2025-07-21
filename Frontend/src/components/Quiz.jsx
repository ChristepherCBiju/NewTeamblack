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
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState("");
  const [company, setCompany] = useState("");
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [releaseRange, setReleaseRange] = useState("");
  const [occasion, setOccasion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        mood,
        company,
        genres: genres.join(","),
        ratings: ratings.join(","),
        releaseRange,
        occasion,
      });

      const result = response.data.recommendation;
      if (result && result.length > 0) {
        navigate("/recommendations", { state: { recommendations: result } });
      } else {
        setError("No recommendations found.");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url('/wall2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(0.7px)",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            borderRadius: 3,
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
              Movie Preference Quiz
            </Typography>

            {step === 0 && (
              <FormControl fullWidth margin="normal">
                <FormLabel sx={{ color: "#ccc" }}>What's your current mood?</FormLabel>
                <RadioGroup value={mood} onChange={(e) => setMood(e.target.value)}>
                  {["Happy", "Sad", "Chill", "Thrilled"].map((m) => (
                    <FormControlLabel
                      key={m}
                      value={m.toLowerCase()}
                      control={<Radio sx={{ color: "#fff" }} />}
                      label={m}
                      sx={{ color: "#fff" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {step === 1 && (
              <FormControl fullWidth margin="normal">
                <FormLabel sx={{ color: "#ccc" }}>Who are you watching with?</FormLabel>
                <RadioGroup value={company} onChange={(e) => setCompany(e.target.value)}>
                  {["Alone", "Partner", "Friends", "Family", "Kids"].map((c) => (
                    <FormControlLabel
                      key={c}
                      value={c.toLowerCase()}
                      control={<Radio sx={{ color: "#fff" }} />}
                      label={c}
                      sx={{ color: "#fff" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {step === 2 && (
              <FormControl fullWidth margin="normal">
                <FormLabel sx={{ color: "#ccc" }}>Select your preferred genres</FormLabel>
                <FormGroup>
                  {allGenres.map((genre) => (
                    <FormControlLabel
                      key={genre}
                      control={
                        <Checkbox
                          checked={genres.includes(genre)}
                          onChange={() => handleGenreChange(genre)}
                          sx={{ color: "#fff" }}
                        />
                      }
                      label={genre}
                      sx={{ color: "#fff" }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}

            {step === 3 && (
              <FormControl fullWidth margin="normal">
                <FormLabel sx={{ color: "#ccc" }}>
                  Select MPAA ratings you're okay with
                </FormLabel>
                <FormGroup>
                  {allRatings.map((rating) => (
                    <FormControlLabel
                      key={rating}
                      control={
                        <Checkbox
                          checked={ratings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                          sx={{ color: "#fff" }}
                        />
                      }
                      label={rating}
                      sx={{ color: "#fff" }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}

            {step === 4 && (
              <FormControl fullWidth margin="normal">
                <FormLabel sx={{ color: "#ccc" }}>Preferred movie release range</FormLabel>
                <RadioGroup
                  value={releaseRange}
                  onChange={(e) => setReleaseRange(e.target.value)}
                >
                  <FormControlLabel value="recent" control={<Radio sx={{ color: "#fff" }} />} label="2015–Now" sx={{ color: "#fff" }} />
                  <FormControlLabel value="mid" control={<Radio sx={{ color: "#fff" }} />} label="2000–2015" sx={{ color: "#fff" }} />
                  <FormControlLabel value="older" control={<Radio sx={{ color: "#fff" }} />} label="1980–2000" sx={{ color: "#fff" }} />
                  <FormControlLabel value="classic" control={<Radio sx={{ color: "#fff" }} />} label="Before 1980" sx={{ color: "#fff" }} />
                </RadioGroup>
              </FormControl>
            )}

            {step === 5 && (
              <FormControl fullWidth margin="normal">
                <FormLabel sx={{ color: "#ccc" }}>What's the occasion?</FormLabel>
                <RadioGroup value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                  {["casual", "party", "date", "holiday", "birthday", "me-time"].map((o) => (
                    <FormControlLabel
                      key={o}
                      value={o}
                      control={<Radio sx={{ color: "#fff" }} />}
                      label={o.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
                      sx={{ color: "#fff" }}
                    />
                  ))}
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
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Quiz;
