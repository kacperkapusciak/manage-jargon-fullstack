const express = require('express');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

const router = express.Router();

router.get('/me', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const valid = await validate(req.body);
  if (!valid) return res.status(400).send('Username or password it too short.');

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send('Username already in use.');

  user = new User({
    username: req.body.username,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  // TODO: generating jwt
});
