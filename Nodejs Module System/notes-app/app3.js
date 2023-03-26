const validator = require('validator');

console.log('isEmail', validator.isEmail('arafath@gmail.com'));
console.log('isURL', validator.isURL('https://www.google.com'));