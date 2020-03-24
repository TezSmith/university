const config = require('config')

const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);

const movies = require('./routes/movies');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals')
const users = require('./routes/users');
const auth = require('./routes/auth');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

if (!config.get('jwtPrivate')) {
  console.error('FATAL ERROR: jwtPrivate key is not defined')
  process.exit(1)
}

mongoose
  .connect('mongodb://localhost/playground', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
  })
  .then(res => {
    console.log('Connected to Vidly DB...');
  })
  .catch(err => console.log('Something is wrong with your Vidly DB'));

app.use(express.json());

app.use('/vidly/api/genres', genres);
app.use('/vidly/api/customers', customers);
app.use('/vidly/api/movies', movies);
app.use('/vidly/api/rentals', rentals)
app.use('/vidly/api/users', users);
app.use('/vidly/api/auth', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
