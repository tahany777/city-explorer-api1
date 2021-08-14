require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const { weather, weather1, weather2 } = require('./controllers/Weather.controller');
const movies = require('./controllers/Movie.controller');
const port = process.env.PORT || 8000;

/*app.get('/weather', (req, res) => {
  //let data1 = newData2.map(el => el.city_name + el.data[1].weather.description + el.data[1].datetime + el.lon);
  res.send(newData2);
});*/
app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/weather/:lon/:lat/:city_name', weather2);

app.get('/weather/:city_name', weather1);
app.get('/weather/:lat/:lon', weather);

app.get('/movies/:city_name', movies);


app.listen(port, () => console.log(`listening on port ${port}`));

