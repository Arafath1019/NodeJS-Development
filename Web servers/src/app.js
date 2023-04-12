const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define path for Express Config
const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials/');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(staticPath));

// sending back html in expressjs
// app.get('/', (req, res) => {
//     res.send('<h1>Weather</h1>');
// });

// sending back JSON in expressjs
// app.get("/help", (req, res) =>{
//     res.send({
//         name: "Yeasin Arafath",
//         age: 25
//     });
// });

//sending back String in expressjs
// app.get("/about", (req, res) =>{
//     res.send("<h1>About page</h1>");
// });


// Rendering Dynamic Templates
app.get('/', (req, res) =>{
    res.render('index', {
        title: "Weather APP",
        name: "Yeasin Arafath"
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: "About Page",
        name: "Yeasin Arafath"
    });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        title: "Help Page",
        name: "Yeasin Arafath"
    })
});

app.get("/weather", (req, res) =>{
    if (!req.query.address){
        return res.send("Please add address in search url")
    } 

    geocode(req.query.address, (error, data) =>{
        if(error) {
            return res.send({error});
        }

        forecast(data.latitude, data.longitude, (error, data) =>{
            if (error) {
                return res.send({error});
            }

            res.send({data});
        })
    })
})

app.get("/help/*", (req, res) =>{
    res.render('404', {
        title: "404",
        name: "Yeasin Arafath",
        errorMessage: "Help article not found"
    })
})

app.get("/*", (req, res) =>{
    res.render('404', {
        title: "404",
        name: "Yeasin Arafath",
        errorMessage: "Page not found"
    });
})

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});