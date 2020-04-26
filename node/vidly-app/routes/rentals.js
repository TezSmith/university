const auth = require('../middleware/auth');
const { Rental, validateRental } = require('../models/rental')
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')
const mongoose = require('mongoose')
const Fawn = require('fawn') // Handles 2 Phase Commits in Mongo

const express = require('express');
const router = express.Router();

Fawn.init(mongoose)

router.get('/', async (req, res) => {
   const rentals = await Rental.find()
   res.send(rentals)
})

router.post('/', auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(404).send(error.details[0].message)

  const movie = await Movie.findById(req.body.movieId)
  if (!movie) return res.status(404).send(error.details[0].message)

  if (movie.numberInStock === 0) return res.status(400).send('Movie is out of stock.')

  const customer = await Customer.findById(req.body.customerId)
  if (!customer) return res.status(404).send(error.details[0].message)

  let rental = new Rental({
    customer: {
      _id : customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate 
    }
  })

  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();
  
  try {
    new Fawn.Task()
    // Working directly with collection
      .save('rentals', rental)
      .update('movies', {_id: movie._id}, {
        $inc: { numberInStock: -1}
      })
      .run();
  
    res.send(rental)
  }
  catch(ex) {
    res.status(500).send('Something failed.')
  }
})

module.exports = router;