const debug = require('debug')('app:startup')
const config = require('config')
const Joi = require('joi');
const { log, authenticate } = require('./middleware/logger');
const courses = require('./routes/courses')
const welcome = require('./routes/welcome');
const express = require('express')
const app = express();

app.set('view engine', 'pug')
app.set('views', './views')

// Middleware to help process JSON data
app.use(express.json());
app.use('/', welcome);
app.use('/api/courses', courses)
// app.use(express.urlencoded({ extended: true }));

app.use(log);
app.use(authenticate);

console.log(`App name: ${config.get('name')}`)
console.log(`App name: ${config.get('mail.host')}`);
console.log(`App name: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  debug('Tez was here')
}

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})