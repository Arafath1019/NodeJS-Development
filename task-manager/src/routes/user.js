const express = require("express");
const multer = require('multer');
const sharp = require('sharp');
const router = express.Router();
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");
const {sendWelcomeEmail, sendCancelation} = require('../emails/account.js');

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
  // user
  //   .save()
  //   .then(() => {
  //     res.send(user);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});

router.get("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // res.send({user: user.getPublicProfile(), token});
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try{
    req.user.tokens = [];
    await req.user.save();
    res.send();
  }catch(error){
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);

  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (error) {
  //   res.status(500).send();
  // }

  // User.find({}).then((users) =>{
  //   res.send(users);
  // }).catch((error) =>{
  //   res.status(500).send();
  // })
});

// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (error) {
//     res.status(500).send();
//   }
//   // User.findById(_id).then((user) =>{
//   //   if(!user){
//   //     return res.status(404).send();
//   //   }

//   //   res.send(user);
//   // }).catch((err) =>{
//   //   res.status(500).send();
//   // })
// });

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = req.user;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    // Mongoose bypass User.findByIdAndUpdate query
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    // if (!user) {
    //   return res.status(404).send();
    // }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    sendCancelation(user.email, user.name);

    // if (!user) {
    //   return res.status(404).send();
    // }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// const avatars = multer({
//   dest: 'avatars',
//   limits:{
//     fileSize: 1000000
//   }, 
//   fileFilter(req, file, cb){
//     if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
//       cb(new Error('Please upload a file within jpg or jpeg or png format'));
//     }
//     cb(undefined, true)
//   }
// });

// router.post('/users/me/avatar', avatars.single('avatar'), (req, res) => {
//   res.send();
// }, (error, req, res, next) => {
//   res.status(400).send({error: error.message});
// })

const avatars = multer({
  limits:{
    fileSize: 1000000
  }, 
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      cb(new Error('Please upload a file within jpg or jpeg or png format'));
    }
    cb(undefined, true)
  }
});

router.post('/users/me/avatar', auth, avatars.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize(320, 240).png().toBuffer();
  // req.user.avatar = req.file.buffer;
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
})

router.delete('/users/me/avatar', auth, async (req, res) =>{
  try{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch(error){
    console.log(error)
  }
})

router.get('/users/:id/avatar', async (req, res) =>{
  try{
    const user = await User.findById(req.params.id);
    if(!user || !user.avatar){
      throw new Error();
    }

    res.set('Content-type', 'image/jpg');
    res.send(user.avatar);
  }catch(error){
    console.log(error)
  }
})

module.exports = router;

// How to use Binary data in client side
// <img src='data:image/jpg;base64,Binary_data' />