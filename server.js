const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 8000;
require('dotenv').config();



const data = require('./data/weather.json');
let newData = JSON.stringify(data);
let newData2 = JSON.parse(newData);


app.get('/weather', (req, res) => {
  let data1 = newData2.map(el => el.city_name + el.data[1].weather.description + el.data[1].datetime + el.lon);
  res.send(data1);
});

app.use(cors());

app.listen(port, () => console.log(`listening on port ${port}`));
