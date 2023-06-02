const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.js");

const Task = require("../models/task.js");

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
  // task.save().then(() =>{
  //     res.send(task);
  // }).catch((error) =>{
  //     res.status(400).send(error);
  // });
});

router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    // res.send(tasks);
    await req.user.populate('tasks');
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
  // Task.find({}).then((tasks) =>{
  //   res.send(tasks);
  // }).catch((error) =>{
  //   res.status(500).send();
  // })
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }

  // Task.findById(_id).then((task) =>{
  //   if(!task){
  //     return res.status(404).send();
  //   }

  //   res.send(task);
  // }).catch((error) =>{
  //   res.status(500).send();
  // })
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update operation!" });
  }

  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({ _id:req.params.id, owner: req.user._id})

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    // Mongoose bypass Task.findByIdAndUpdate query
    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    })

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
