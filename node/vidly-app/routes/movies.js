const auth = require('../middleware/auth');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(404).send('Could not add movie');

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(404).send('Invalid genre');

  const movie = new Movie({
    title: req.body.title,
    genre: {_id: genre._id, name: genre.name},
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  await movie.save();

  res.send(movie);
});

module.exports = router;
