import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, CardContent, Typography, Button, CardMedia, Box } from "@mui/material";

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

  if (index >= recommendations.length) {
    return (
      <Container
        maxWidth="sm"
        sx={{ 
          textAlign: "center", 
          marginTop: 20, 
          backgroundColor: "white", 
          padding: 3, 
          borderRadius: 2,
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px"
        }}
      >
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Recommendation is over
        </Typography> <Button    sx={{mt: 1.7 ,borderColor: "green"}}  variant="outlined"
              
              onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : 0))}
              disabled={index === 0}
            >
              Back to the previous movie
             
            </Button>
        <Button onClick={() => navigate("/quiz")} variant="outlined" sx={{ mt: 2, color: "white", borderColor: "red" }}>
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
        paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card className="tux"
        sx={{
          minWidth:650,
          maxWidth:650,
          
          backgroundColor: "rgba(0, 0, 0, 0.8)",
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
          <Typography  textAlign={"center"} color="primary" variant="h5" gutterBottom sx={{  backgroundColor: "rgba(53, 52, 52, 0.8)",color: 'primary', fontWeight: 'bold', textShadow: '1px 1px 2px ' }}>
            {movie.title}
          </Typography>
          <Typography textAlign={"center"} variant="body2" sx={{ mb: 2, color: 'white', textShadow: '1px 1px 2px black' }}>
            {movie.overview || "No description available."}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Button     variant="outlined"
              sx={{ color:'primary',backgroundColor: 'primary',borderColor:'red'}}
              onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : 0))}
              disabled={index === 0}
            >
              🔙 Back
             
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) {
                  alert("Please log in to add to watch list.");
                  return;
                }
                try {
                  const response = await fetch("http://localhost:3030/add-watched", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id, movie: { ...movie, id: movie.id || movie._id || movie.movieId } }),
                  });
                  const data = await response.json();
                  if (response.ok) {
                    alert("Movie added to watch list!");
                    window.dispatchEvent(new CustomEvent('watchedListUpdated'));
                  } else {
                    alert(data.error || "Failed to add movie to watched list.");
                  }
                } catch (error) {
                  alert("Network error. Please try again.");
                }
              }} 
            >
              Add to Watch List
            </Button>

            <Button
              variant="outlined"
              sx={{ backgroundColor: 'primary',borderColor:'green'}}
              onClick={() => setIndex((prev) => prev + 1)}
            >
              Next 🔜&nbsp;
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 1.7,borderColor: "red" }}>
            <Button  sx={{color:'red',borderColor: "red" }}
           variant="contained"
              onClick={() => navigate("/quiz")} 
            >
              Back to Quiz
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationsSlider;
