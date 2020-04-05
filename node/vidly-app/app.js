const winston = require('winston');
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log', level: 'info' }),
  ],
});

const express = require('express');
const app = express();

require('./startup/logging')();
// Sends app instance to route files.
require('./startup/routes')(app)
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});
