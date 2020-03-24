const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
    new: true
  })
  if (!genre) return res.status(404).send("Sorry, couldn't find that genre.");

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if (!genre) return res.status(404).send("Sorry, couldn't find that genre.");

  // let genre = await Genre.findById(req.params.id);
  // if (!genre) return res.status(404).send("Sorry, couldn't find that genre.");

  res.send(`This course has been deleted: ${genre}`);
});

module.exports = router;
