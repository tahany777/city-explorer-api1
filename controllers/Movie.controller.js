'use strict';
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const axios = require('axios');
const Movies = require('../models/Movie.model');
const Cache = require('../helpers/forCastCache.helper');
const forCastCache = new Cache([]);

const movies = async (request, response) => {
  if(forCastCache.forcast.length) {
    response.send(forCastCache.forcast);
  } else {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${request.params.city_name}`;
    let newArrMovie = [];
    let filteredMovie ;
    await axios.get(url).then(results => {
      filteredMovie = results.data.results;
      newArrMovie = filteredMovie.map(el => {return new Movies(el); });
      console.log(results);
      forCastCache.forcast = newArrMovie;
      response.send(newArrMovie);
    }).catch(err => {
      response.status(500).send(err);
    });
  }
};

module.exports=movies;

