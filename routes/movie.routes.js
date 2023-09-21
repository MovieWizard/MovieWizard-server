const router = require("express").Router();
const Movie = require("../models/Movie");

// Get all movies
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(movies => res.json(movies))
    .catch(e => {
        res.status(500).json({
            message: "Error get the movies list",
            error: e
        })
    })

})

// Get movie by Id
router.get('/movies/:movieId', (req, res, next) => {
    const {movieId} = req.params
    Movie.findById(movieId)
    .then(movie => res.json(movie))
    .catch(e => {
        res.status(500).json({
            message: "Error get the movie details",
            error: e
        }) 
    }
    )
})

module.exports = router;