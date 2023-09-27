const router = require("express").Router();
const List = require("../models/MovieList");
const Movie = require("../models/Movie");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//Get all mood list
router.get("/mood-lists", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  List.find({ user: userId })
    .then((lists) => res.json(lists))
    .catch((e) => {
      res.status(500).json({
        message: "Error get all lists",
        error: e,
      });
    });
});

//Create new mood list
router.post("/mood-lists", isAuthenticated, (req, res, next) => {
  const { title, description, mood } = req.body;
  const user = req.payload._id;
  List.create({ title, description, mood, user })
    .then((newList) => res.json(newList))

    .catch((e) => {
      res.status(500).json({
        message: "Error create new mood list ",
        error: e,
      });
    });
});

// Get mood list
router.get("/mood-lists/:moodListId", isAuthenticated, (req, res, next) => {
  const { moodListId } = req.params;
  List.findById(moodListId)
    .then((list) => res.json(list))
    .catch((e) => {
      res.status(500).json({
        message: "Error get a mood list ",
        error: e,
      });
    });
});

//Update movie list
router.put("/mood-lists/:moodListId/add", isAuthenticated, (req, res, next) => {
  const { moodListId } = req.params;
  const { movieId } = req.body;

  List.findByIdAndUpdate(
    moodListId,
    { $push: { movies: movieId } },
    { new: true }
  )
    .then((updateList) => res.json(updateList))
    .catch((e) => {
      res.status(500).json({
        message: "Error update a mood list ",
        error: e,
      });
    });
});

router.put(
  "/mood-lists/:moodListId/remove",
  isAuthenticated,
  (req, res, next) => {
    const { moodListId } = req.params;
    const { movieId } = req.body;

    List.findByIdAndUpdate(
      moodListId,
      { $pull: { movies: movieId } },
      { new: true }
    )
      .then((updateList) => res.json(updateList))
      .catch((e) => {
        res.status(500).json({
          message: "Error update a mood list ",
          error: e,
        });
      });
  }
);

module.exports = router;
