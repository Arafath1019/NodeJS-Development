// For Openweathermap api endpoints and api key
// Create an account in https://openweathermap.org/
// Grab your api keys from this, https://home.openweathermap.org/api_keys
// Explore different api's provided by openweathermap.org
// For current weather data, follow the process here, https://openweathermap.org/current#geo

const request = require('request');
const your_api_key = 'Place_Your_API_KEY_Here';

const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${your_api_key}`;
    request(url, (error, response) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if(response.body.error){
            callback('Unable to find location!', undefined)
        } else{
            const data = JSON.parse(response.body);
            callback(undefined, `It is currently ${data.main.temp} degree out, but it feels like ${data.main.feels_like} degree!`);
        }
    })
};

module.exports = forecast;