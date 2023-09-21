const router = require("express").Router();
const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");
const { isAuthenticated } = require("../middleware/jwt.middleware")


// Get all movies

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(movie => res.json(movie))
    .catch(e => {
        console.log("Error get the list of Movies...", e);
        res.status(500).json(e)
    })

})