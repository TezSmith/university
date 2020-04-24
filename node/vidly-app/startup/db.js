const winston = require('winston')
const mongoose = require('mongoose');
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'logfile.log', level: 'info' }),
  ],
});
const config = require('config')


module.exports = function (){
  const db = config.get('db');
  mongoose
   .connect(db, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: false,
   })
   .then((res) => {
     logger.info(`Connected to ${db}...`);
   })
}
