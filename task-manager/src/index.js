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
