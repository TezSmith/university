const winston = require('winston')

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true, handleExceptions: true, level: 'info' }),
    // - Write all logs to `logfile.log`.
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.MongoDB({ db: 'mongodb://localhost/playground', options: { useUnifiedTopology: true }, level: 'error'}),
  ],
});

module.exports = function(err, req, res, next) {
  logger.error(err.message)
  // Set logging level error > warn > info > verbose > debug > silly
  res.status(500).send('Something failed')
}