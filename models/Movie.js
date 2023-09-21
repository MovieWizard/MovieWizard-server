const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MovieSchema = new Schema({
    title: String,
    year: String,
    poster: String,
    actors: String,
    genre: String,
    plot: String,
})

module.exports = model('Movie', MovieSchema);