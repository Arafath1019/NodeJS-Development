const express = require("express");
require('dotenv').config()
require("./db/mongoose.js");
const userRoutes = require("./routes/user.js");
const taskRoutes = require("./routes/task.js");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
// app.use((req, res, next) => {
//   if(req.method === "POST"){
//     res.send("POST request is disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) =>{
//   res.status(503).send("Site is currently down. Check back soon!");
// });

// Uploading file using multer
// const multer = require('multer');
// const uploads = multer({
//   dest: 'uploads',
//   limits:{
//     fileSize: 1000000
//   },
//   // fileFilter(req, file, cb){
//   //   if(!file.originalname.endsWith('.png')){
//   //     cb(new Error('Please upload a file with png format'));
//   //   }

//   //   cb(undefined, true);
//   // }

//   fileFilter(req, file, cb){
//     if(!file.originalname.match(/\.(png|jpg)$/)){
//       cb(new Error('Please upload a file with png or jpg format'));
//     }
//     cb(undefined, true);
//   }
// });

// app.post('/uploads', uploads.single('upload'), (req, res)=>{
//   res.send();
// }, (error, req, res, next) => {
//   res.status(400).send({error: error.message});
// })

app.use(express.json());

app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//   const password = "Red12345!";

//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log("Password : ", password);
//   console.log("Hashed Password : ", hashedPassword);

//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   console.log("Is match : ", isMatch);
// }

// myFunction();

// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismycourse", { expiresIn: "7 days" });
//   console.log(token);

//   const data = jwt.verify(token, "thisismycourse");
//   console.log(data);
// };

// myFunction();

// const Task = require('./models/task.js');
// const User = require('./models/user.js');

// const main = async () =>{
//   const task = await Task.findById("647a2b2d97817843cfdd123d");
//   await task.populate('owner');
//   console.log(task.owner);

//   const user = await User.findById("647a2aa27bb54fe78c43bb52");
//   await user.populate('tasks');
//   console.log(user.tasks);
// }

// main();
