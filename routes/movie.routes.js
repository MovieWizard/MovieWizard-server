const router = require("express").Router();
const Movie = require("../models/Movie");
const mongoose = require("mongoose");

// Get all movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => res.json(movies))
    .catch((e) => {
      res.status(500).json({
        message: "Error get the movies list",
        error: e,
      });
    });
});

// Get movie by Id
router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => res.json(movie))
    .catch((e) => {
      res.status(500).json({
        message: "Error get the movie details",
        error: e,
      });
    });
});

//CREATE MOVIE:
router.post("/movies", (req, res, next) => {
  const { title, plot, poster, actors, year, genre } = req.body;

  const newMovie = {
    title,
    plot,
    poster,
    actors,
    year,
    genre,
  };

  Movie.create(newMovie)
    .then((response) => res.json(response))
    .catch((e) => {
      console.log("Error creating new Movie", e);
      res.status(500).jsob({
        message: "Error creating a new Movie",
        error: e,
      });
    });
});

//UPDATE/EDIT MOVIE:
router.put("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const newDetails = {
    ttle: req.body.title,
    plot: req.body.plot,
    poster: req.body.poster,
    actors: req.body.actors,
    year: req.body.year,
    genre: req.body.genre,
  };

  Movie.findByIdAndUpdate(movieId, newDetails, { new: true })
    .then((updatedMovie) => res.json(updatedMovie))
    .catch((e) => {
      console.log("Error updating Movie", e);
      res.status(500).json({
        message: "Error updating Movie",
        error: e,
      });
    });
});

//DELETE MOVIE:
router.delete("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Movie.findByIdAndRemove(movieId)
    .then(() =>
      res.json({
        message: `Movie with ${movieId} was removed successfully.`,
      })
    )
    .catch((e) => {
      console.log("Error removing the movie", e);
      res.status(500).json({
        error: e,
      });
    });
});

module.exports = router;
