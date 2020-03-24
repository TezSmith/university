const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  email: { 
    type: String, 
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  password: { 
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivate'));
    return token
  }

const validateUser = (body) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  }

  return Joi.validate(body, schema)
}



const User = mongoose.model('User', userSchema)


exports.User = User;
exports.validateUser = validateUser;