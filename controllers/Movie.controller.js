'use strict';
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const axios = require('axios');
const Movies = require('../models/Movie.model');
//let cache = {};
const movies = async (request, response) => {
  //let query = request.params.city_name;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${request.params.city_name}`;
  let newArrMovie = [];
  //if(cache[query]) {
  //console.log('we get data from local');
  //response.send(cache[query].data);
  //} else {
  let filteredMovie ;
  await axios.get(url).then(results => {
    //cache[query] = results.data.results;
    filteredMovie = results.data.results;
    newArrMovie = filteredMovie.map(el => {return new Movies(el); });
    console.log(results);
    response.send(newArrMovie);
  }).catch(err => {
    response.status(500).send(err);
  });
//}
};

module.exports=movies;

