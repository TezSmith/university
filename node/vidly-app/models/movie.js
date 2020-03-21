const Joi = require('joi')
const mongoose = require('mongoose')
const { genreSchema } = require('./genre')

//Hybrid Method 
const validate = (body) => {
  const schema = {
    title: Joi.string().min(3),
    genreId: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  }
  return Joi.validate(body,schema)
}

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: String,
  numberInStock: Number,
  genre: { type: genreSchema, required: true },
  dailyRentalRate: Number,
}))

exports.Movie = Movie
exports.validate = validate