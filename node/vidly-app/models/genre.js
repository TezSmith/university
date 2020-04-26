const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
  name: { type: String, required: true, min: 5, max: 50 }
});

const Genre = mongoose.model('Genre', genreSchema);

const validateGenre = body => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(body, schema);
};

exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.genreSchema = genreSchema;