const fs = require('fs');

const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday'
};

const bookJSON = JSON.stringify(book);
fs.writeFileSync('bookJSON.json', bookJSON);

const dataBuffer = fs.readFileSync('bookJSON.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data); 

// console.log(bookJSON);

// const parsedData = JSON.parse(bookJSON);

// console.log(parsedData);

const userDataBuffer = fs.readFileSync('1-json.json');
const userDataJSON = userDataBuffer.toString();
const userData = JSON.parse(userDataJSON);
userData.name = "Arafath";
userData.age = 25;
const updatedJsonData = JSON.stringify(userData);
fs.writeFileSync('1-json.json',updatedJsonData);