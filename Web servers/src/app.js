const path = require('path');
const express = require('express');

const app = express();

const staticPath = path.join(__dirname, '../public');

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

app.get("/weather", (req, res) =>{
    res.send({
        forecast: "It is snowing",
        location: "Dhaka"
    });
})

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});