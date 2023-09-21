const router = require("express").Router();
const Movie = require("../models/Movie");

// Get all movies
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(movie => res.json(movie))
    .catch(e => {
        console.log("Error get the list of Movies...", e);
        res.status(500).json(e)
    })

})

module.exports = router;