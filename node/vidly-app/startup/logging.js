const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'logfile.log', level: 'info' }),
    new winston.transports.MongoDB({ db: 'mongodb://localhost/playground', options: { useUnifiedTopology: true}, level: 'error' }),
  ],
});

module.exports = function() {
  logger.exceptions.handle();

  process.on('unhandledRejection', (ex) => {
    throw ex; // This will work with Winston
  });
}

// Does not work with unsynchoronous code (like call to db)
// process.on('uncaughtException', (ex) => {
//   logger.error(ex.messsage, ex); 
//   process.exit(1)
// });

// Same as above
// logger.handleExceptions(new winston.transports.File({
//  filename: 'uncaughtExceptions.log'
// }))

// process.on('unhandledException', (ex) => {
//   // logger.error(ex.messsage, ex);
//   // process.exit(1);
//   throw ex // This will work with Winston
// });