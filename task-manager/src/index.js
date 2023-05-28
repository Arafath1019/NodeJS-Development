const express = require("express");
require("./db/mongoose.js");
const userRoutes = require('./routes/user.js');
const taskRoutes = require('./routes/task.js');

const app = express();
const port = process.env.PORT || 3000;

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