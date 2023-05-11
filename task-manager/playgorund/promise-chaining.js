require('../src/db/mongoose.js');
const User = require('../src/models/user.js');

User.findByIdAndUpdate('123456789', { age: 1 }).then((user) =>{
    console.log(user);
    return User.countDocuments({ age: 1 });
}).then((result) =>{
    console.log(result);
}).catch((error) =>{
    console.log(error);
})