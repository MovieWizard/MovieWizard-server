const { default: mongoose } = require("mongoose");
const fs = require('fs')
const Movie = require("../models/Movie");
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MovieWizard-server'

const path = require('path')
const moviesString = fs.readFileSync(path.resolve(__dirname, "./movies.json"), "utf-8")
const movies = JSON.parse(moviesString)

const updatedMovies = movies.map(e => {
    const newSeed = {}
    for(key in e) {
        if(key === "imdbRating"){
            newSeed[key] = e[key]
        } else {

            newSeed[key.toLowerCase()] = e[key]
        }

    }
return newSeed
})


mongoose
.connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
    return Movie.deleteMany({}); 
  })
    .then((response) => {
      console.log("Deleted all data from database");
      return Movie.create(updatedMovies);
    })
    // Create new movie
  .then(moviesFromDB => {
    console.log(`Created ${moviesFromDB.length} movies`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch(err => {
    console.log(`An error occurred while creating movies from the DB: ${err}`);
  });
