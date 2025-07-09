const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  genres: String,       
  overview: String,
  final_mood: String    
});

module.exports = mongoose.model("Movie", movieSchema);
