require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 3001;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


const data = require('./data/weather.json');
const axios = require('axios');


let newData = JSON.stringify(data);
let newData2 = JSON.parse(newData);


app.get('/weather', (req, res) => {
  //let data1 = newData2.map(el => el.city_name + el.data[1].weather.description + el.data[1].datetime + el.lon);
  res.send(newData2);
});

app.get('/weather/:lon/:lat/:city_name', (req, res) => {
  let city = newData2.find(el => el.lon === req.params.lon && el.lat === req.params.lat && el.city_name === req.params.city_name);
  if(city) {res.send(city);}
  else {res.status(500).send('Not Available');}
});

app.get('/weather/:city_name', (req, res) => {
  let newArr = [];
  let cityWeather = newData2.find((el) => el.city_name === req.params.city_name);
  if(cityWeather) {
    cityWeather.data.map((el) => newArr.push(new Forecast(el)));
    res.send(newArr);
  } else {
    res.status(500).send('the location not found');
  }
});
app.get('/weather/:lat/:lon', (req, response) => {
  let url1 = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${req.params.lat}&lon=${req.params.lon}&key=${WEATHER_API_KEY}`;
  let newArr = [];
  let filtered;
  axios.get(url1).then(res => {
    filtered = res.data;
    newArr = filtered.data.map((el) => {return new Forecast(el);});
    response.send(newArr);
  }).catch(err => {
    response.status(500).send(err);
    console.log(err);
  });
  console.log(newArr);

});

app.get('/movies/:city_name', (request, response) => {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${request.params.city_name}`;
  let newArrMovie = [];
  let filteredMovie;
  axios.get(url).then(res => {
    filteredMovie = res.data;
    newArrMovie = filteredMovie.map(el => {return new Movies(el.data.results); });
    response.send(newArrMovie);
  }).catch(err => {
    response.status(500).send(err);
  });
});
class Forecast {
  constructor(selectedCity) {
    this.date = selectedCity.datetime;
    this.description = selectedCity.weather.description;
  }
}

class Movies {
  constructor(selected) {
    this.title = selected.original_title;
    this.vot = selected.vote_count;
    this.img = `https://image.tmdb.org/t/p/w500${selected.poster_path}`;
  }
}
app.listen(port, () => console.log(`listening on port ${port}`));
