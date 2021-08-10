require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT;


const data = require('./data/weather.json');

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
    res.status.send('the location not found');
  }
});

class Forecast {
  constructor(selectedCity) {
    this.date = selectedCity.datetime;
    this.description = selectedCity.weather.description;
  }
}
app.listen(port, () => console.log(`listening on port ${port}`));
