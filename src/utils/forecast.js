const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ff31dd9078318e58ce997077be4d6ca7&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find locations", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          ", but it feels like " +
          body.current.feelslike +
          "."
      );
    }
  });
};

module.exports = forecast;
