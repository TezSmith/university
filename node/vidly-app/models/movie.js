const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const { genreSchema } = require('./genre')

// Embedded Method 
const validateMovie = (body) => {
  const schema = {
    title: Joi.string().min(3),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  }
  return Joi.validate(body,schema)
}

const movieSchema = new mongoose.Schema({
  title: String,
  numberInStock: Number,
  genre: { type: genreSchema, required: true },
  dailyRentalRate: Number,
})

const Movie = mongoose.model('Movie', movieSchema)

exports.Movie = Movie
exports.validateMovie = validateMovie
exports.movieSchema = movieSchema