const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: Number,
  isGold: { type: Boolean, default: false }
});

const validate = body => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(body, schema);
};

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.validate = validate;
