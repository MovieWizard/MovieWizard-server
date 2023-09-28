const router = require("express").Router();
const Movie = require("../models/Movie");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//Get Search results
router.get("/search", (req, res, next) => {
  const { q } = req.query;
  Movie.find({ title: { $regex: q, $options: "i" } })
    .then((search) => res.json(search))
    .catch((e) => {
      res.status(500).json({
        message: "Error get search result",
        error: e,
      });
    });
});

//Get filter results

router.get("/filters", (req, res, next) => {
  const { rating, genre, year, lastMovieId } = req.query;
  if (lastMovieId) {
    Movie.find({
      imdbRating: { $gte: rating },
      year: { $gte: year },
      genre: { $regex: genre, $options: "i" },
      _id: { $gt: lastMovieId },
    })
      .limit(4)
      .then((filter) => res.json(filter))
      .catch((e) => {
        res.status(500).json({
          message: "Error get search result",
          error: e,
        });
      });
  } else {
    Movie.find({
      imdbRating: { $gte: rating },
      year: { $gte: year },
      genre: { $regex: genre, $options: "i" },
    })
      .limit(4)
      .then((filter) => res.json(filter))
      .catch((e) => {
        res.status(500).json({
          message: "Error get search result",
          error: e,
        });
      });
  }
});

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

// GET MOVIES BY CURRENT USER:
router.get("/my-movies", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Movie.find({
    user: userId,
  })
    .then((movies) => res.json(movies))
    .catch((e) => {
      res.status(500).json({
        message: "Error get my movies",
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
router.post("/movies", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  const {
    title,
    year,
    poster,
    actors,
    genre,
    plot,
    imdbRating,
    language,
    videoid,
  } = req.body;

  const newMovie = {
    title,
    plot,
    poster,
    actors,
    year,
    genre,
    imdbRating,
    language,
    videoid,
    user: userId,
  };

  Movie.create(newMovie)
    .then((response) => res.json(response))
    .catch((e) => {
      if (e.code === 11000) {
        res.status(400).json({
          message: "This movie exist, add another one",
          error: e,
        });
      } else {
        res.status(500).json({
          message: "Error creating a new Movie",
          error: e,
        });
      }
    });
});

//UPDATE/EDIT MOVIE:
router.put("/movies/:movieId", isAuthenticated, (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const newDetails = {
    title: req.body.title,
    plot: req.body.plot,
    poster: req.body.poster,
    actors: req.body.actors,
    year: req.body.year,
    genre: req.body.genre,
    imdbRating: req.body.imdbRating,
    language: req.body.language,
  };

  Movie.findById(movieId)
    .then((movie) => {
      console.log(movie);
      if (movie.user.toString() !== userId) {
        res.status(403).json({ message: "Permission denied" });
        return;
      }

      Movie.findByIdAndUpdate(movieId, newDetails, { new: true })
        .then((updatedMovie) => res.json(updatedMovie))
        .catch((e) => {
          console.log("Error updating Movie", e);
          res.status(500).json({
            message: "Error updating Movie",
            error: e,
          });
        });
    })
    .catch((e) => {
      console.log("Error finding Movie", e);
      res.status(500).json({
        message: "Error finding Movie",
        error: e,
      });
    });
});

//DELETE MOVIE:
router.delete("/movies/:movieId", isAuthenticated, (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Movie.findById(movieId)
    .then((movie) => {
      console.log(movie);
      if (movie.user.toString() !== userId) {
        res.status(403).json({ message: "Permission denied" });
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
    })
    .catch((e) => {
      console.log("Error finding Movie", e);
      res.status(500).json({
        message: "Error finding Movie",
        error: e,
      });
    });
});

module.exports = router;
