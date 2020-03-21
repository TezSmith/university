const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
  name: { type: String, required: true, min: 5, max: 25 }
});

const Genre = mongoose.model('Genre', genreSchema);

const validate = body => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(body, schema);
};

exports.Genre = Genre;
exports.validate = validate;
exports.genreSchema = genreSchema;