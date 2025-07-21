import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, CardContent, Typography, Button, CardMedia } from "@mui/material";

const RecommendationsSlider = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations || [];

  const [index, setIndex] = useState(0);

  if (!recommendations.length) {
    return (
      <Container
        maxWidth="sm"
        sx={{ textAlign: "center", marginTop: 10, color: "#fff" }}
      >
        <Typography variant="h5">No recommendations found.</Typography>
        <Button onClick={() => navigate("/quiz")} variant="outlined" sx={{ mt: 2 }}>
          Back to Quiz
        </Button>
      </Container>
    );
  }

  const movie = recommendations[index];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/wall2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "#fff",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        {movie.poster_path && (
          <CardMedia
            component="img"
            image={movie.poster_path}
            alt={movie.title}
            sx={{ height: 450, objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {movie.overview || "No description available."}
          </Typography>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/quiz")}
            >
              Back to Quiz
            </Button>

            {index < recommendations.length - 1 ? (
              <Button
                variant="contained"
                onClick={() => setIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            ) : (
              <Typography variant="body2" color="#ccc" sx={{ mt: 1 }}>
                End of Recommendations
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationsSlider;
