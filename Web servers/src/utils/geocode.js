
const request = require('request');
const your_api_key = `your_api_key`;

// For Geocoding api endpoints
// Use this for Geocoding api https://openweathermap.org/api/geocoding-api and also api_key is same as openweathermap.org

const geocode = (address, callback) =>{
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${your_api_key}`;
    request(url, (error, response) =>{
        const data = JSON.parse(response.body);
        if(error){
            callback('Unable to connect to location services!', undefined);
        } else if(data.length === 0){
            callback('Unable to find location. Try another search!', undefined);
        } else{
            callback(undefined, {
                latitude: data[0].lat,
                longitude: data[0].lon,
                location: data[0].name
            })
        }
    })
};

module.exports = geocode;