const winston = require('winston')
const mongoose = require('mongoose');
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'logfile.log', level: 'info' }),
  ],
});


module.exports = function (){
  mongoose
   .connect('mongodb://localhost/playground', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: false,
   })
   .then((res) => {
     logger.info('Connected to MongoDB...');
   })
}
