const movies = require('./routes/movies');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('Connected to Vidly DB...');
  })
  .catch(err => console.log('Something is wrong with your Vidly DB'));

app.use(express.json());

app.use('/vidly/api/genres', genres);
app.use('/vidly/api/customers', customers);
app.use('/vidly/api/movies', movies);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
