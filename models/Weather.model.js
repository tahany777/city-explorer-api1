'use strict';

class Forecast {
  constructor(selectedCity) {
    this.date = selectedCity.datetime;
    this.description = selectedCity.weather.description;
  }
}

module.exports=Forecast;
