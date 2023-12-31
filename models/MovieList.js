const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MovieListSchema = new Schema({
    title: String,
    description: String,
    mood: String,
    movies: [{
        type: Schema.Types.ObjectId, 
        ref: 'Movie',
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

})

module.exports = model('MovieList', MovieListSchema);