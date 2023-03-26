// Blocking Code

const getUserSync = require('./src/getUserSync');

const userOne = getUserSync(1);
console.log(userOne);

const userTwo = getUserSync(2);
console.log(userTwo);

const sum = 1 + 33;
console.log(sum);


// Non-Blocking Code

const getUser = require('./src/getUser');

getUser(1, (user) =>{
    console.log(user);
});

getUser(2, (user) =>{
    console.log(user);
});

const sumNumbers = 1 + 33;
console.log(sumNumbers);