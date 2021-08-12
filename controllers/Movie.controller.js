'use strict';
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const axios = require('axios');
const Movies = require('../models/Movie.model');

const movies = async (request, response) => {
  console.log(request.params.city_name);
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${request.params.city_name}`;
  let newArrMovie = [];
  let filteredMovie ;
  await axios.get(url).then(results => {
    filteredMovie = results.data.results;
    newArrMovie = filteredMovie.map(el => {return new Movies(el); });
    console.log(results);
    response.send(newArrMovie);
  }).catch(err => {
    response.status(500).send(err);
  });
};

module.exports=movies;

