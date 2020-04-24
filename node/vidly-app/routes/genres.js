const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId')

const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Sorry, couldn't find that genre.");
  res.send(genre);
});

router.post('/', auth, async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
    new: true
  })
  if (!genre) return res.status(404).send("Sorry, couldn't find that genre.");

  res.send(genre);
});

// Use array for multiple middleware functions
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if (!genre) return res.status(404).send("Sorry, couldn't find that genre.");

  // let genre = await Genre.findById(req.params.id);
  // if (!genre) return res.status(404).send("Sorry, couldn't find that genre.");

  res.send(`This course has been deleted: ${genre}`);
});

module.exports = router;
