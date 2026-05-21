const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3030;

require("./Db"); 
const Movie = require("./Model");
const User = require("./UserModel"); 

app.use(cors());
app.use(express.json());


(async () => {
  try {
    const adminUser = await User.findOne({ username: "admin" });
    if (!adminUser) {
      const newAdmin = new User({
        username: "admin",
        password: "teamblack2025",
        mail: "admin@teamblack.com",
        phone: "",
        gender: "",
        role: "admin",
        isActive: true
      });
      await newAdmin.save();
      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
})();

app.post("/signup", async (req, res) => {
  const { username, password, mail, phone, gender } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { mail }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }
    const newUser = new User({ username, password, mail, phone, gender, isActive: true });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User creation failed" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.isActive) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
 
    res.json({ message: "Login successful", user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/recommend", async (req, res) => {
  const { mood, genres } = req.body;
  console.log("POST /recommend received");
  console.log("Request body:", req.body);

  let query = {};


  if (mood && mood !== "neutral") {
    query.final_mood = mood;
  }
  if (genres && genres.length > 0) {
    query.genres = { $regex: genres.join("|"), $options: "i" };
  }

  try {
    const recommendations = await Movie.find(query).limit(10);
    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Recommendation failed" });
  }
});


app.get("/users", async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find(
      { username: { $regex: search, $options: "i" }, isActive: true },
      '-password'
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.post("/remove-user", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isActive = false;
    await user.save();
    res.json({ message: "User removed successfully" });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ error: "Failed to remove user" });
  }
});

app.post("/add-watched", async (req, res) => {
  const { userId, movie } = req.body;
  if (!userId || !movie) {
    return res.status(400).json({ error: "Missing userId or movie data" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Removed duplicate check to allow adding any number of movies
    user.watched.push(movie);
    await user.save();
    res.json({ message: "Movie added to watched list" });
  } catch (error) {
    console.error("Error adding movie to watched list:", error);
    res.status(500).json({ error: "Failed to add movie to watched list" });
  }
});

app.post("/remove-watched", async (req, res) => {
  const { userId, movieId, movieTitle } = req.body;
  if (!userId || (!movieId && !movieTitle)) {
    return res.status(400).json({ error: "Missing userId or movie identifier" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (movieId) {
      user.watched = user.watched.filter((m) => m.id !== movieId);
    } else if (movieTitle) {
      user.watched = user.watched.filter((m) => m.title !== movieTitle);
    }
    await user.save();
    res.json({ message: "Movie removed from watched list" });
  } catch (error) {
    console.error("Error removing movie from watched list:", error);
    res.status(500).json({ error: "Failed to remove movie from watched list" });
  }
});

app.get("/watched/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ watched: user.watched || [] });
  } catch (error) {
    console.error("Error fetching watched list:", error);
    res.status(500).json({ error: "Failed to fetch watched list" });
  }
});

app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
