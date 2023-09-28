const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    unique: true,
    require: true,
  },
  year: String,
  poster: String,
  actors: String,
  genre: String,
  plot: String,
  imdbRating: String,
  language: String,
  videoid: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Movie", MovieSchema);
