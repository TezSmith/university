const winston = require('winston');
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true, handleExceptions: true, level: 'info' }),
    new winston.transports.File({ filename: 'logfile.log', level: 'info' }),
  ],
});

const express = require('express');
const app = express();

require('./startup/logging')();
// Sends app instance to route files.
require('./startup/routes')(app)
require('./startup/prod')(app)
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});

module.exports = server;
