const express = require('express');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

const router = express.Router();

// logging in the users
router.post('/', async (req, res) => {
  const valid = await validate(req.body);
  if (!valid) return res.status(400).send('Username or password is too short.');

  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Invalid username or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password.');

  const token = user.generateAuthToken();
  return res.send(token);
});

module.exports = router;
