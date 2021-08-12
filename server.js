'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
let PORT = process.env.PORT;
const weather = require('./modules/weather.js');


app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon).then(summaries => response.send(summaries.data)).catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!');
  });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
