const geocode = (address, callback) =>{
    const location = {
        lat: 0,
        lon: 0
    };
    callback(location);
};

geocode("Dhaka", (location) =>{
    console.log(location)
});

const add = (number1, number2, callback) =>{
    callback(number1 + number2);
};

add(1,4, (sum) => {
    console.log(sum);
})
