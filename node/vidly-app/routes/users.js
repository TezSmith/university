const auth = require('../middleware/auth');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Gets the current user without using the id.
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user)
})

// Registration
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  // Check if user is already in database
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.')
  
  // Selects the request data that you want to store
  user = new User(_.pick(req.body, ['name', 'email', 'password']))

  // Hashes the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  // Sends token back and selects data to return to client
  res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
})

module.exports = router;