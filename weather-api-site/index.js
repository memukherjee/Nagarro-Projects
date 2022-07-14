const http = require("http");
const axios = require("axios");
require('dotenv').config()

const apiKey = process.env.WEATHER_API_KEY;
const longitude = 77.209;
const latitude = 28.6139;

const city = "asansol";
const countryCode = "IN";
const stateCode = "WB";

const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`;
const url3 = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateCode},${countryCode}&units=metric&appid=${apiKey}`;

http
  .createServer(function (request, response) {
    axios
      .get(url3)
      .then((res) => res.data)
      .then((data) => {
        response.write(`<html>
                            <head>
                                <title>Weather</title>
                            </head>
                            <body> 
                                <div id='container'>
                                    <h1> Place - : ${data.name}<h1>
                                    <h1> Weather type - : ${data.weather[0].main} <h1>
                                    <h1> Temprature - : ${data.main.temp} &deg;C<h1>
                                    <h1> Visibility - : ${data.visibility} meter<h1>
                                    <h1> Humidity - : ${data.main.humidity}%<h1>
                                </div>
                            </body>
                        </html>`);

        response.end();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .listen(3000, () => console.log("Running on port 3000"));
