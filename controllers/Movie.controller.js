'use strict';
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const axios = require('axios');
const Movies = require('../models/Movie.model');

const movies = (request, response) => {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${request.params.city_name}`;
  let newArrMovie = [];
  let filteredMovie;
  axios.get(url).then(res => {
    filteredMovie = res.data.results;
    newArrMovie = filteredMovie.map(el => {return new Movies(el); });
    response.send(newArrMovie);
  }).catch(err => {
    response.status(500).send(err);
  });
};

module.exports=movies;
