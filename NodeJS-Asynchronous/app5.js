const http = require('http');

const your_api_key = `Place_Your_API_KEY_Here`;

const url = `http://api.openweathermap.org/geo/1.0/direct?q=dhaka&limit=5&appid=${your_api_key}`;

const request = http.request(url, (response)=>{
    let data = '';

    response.on('data', (chunk) =>{
        data = data + chunk.toString();
    });
    
    response.on('end', ()=>{
        const body = JSON.parse(data);
        console.log(body);
    })

    response.on('error', (error) =>{
        console.log("An error ",error);
    })
})

request.end();