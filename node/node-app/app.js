const http = require('http')
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World')
    res.end();
  }
  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]))
    res.end();
  }
});


// This is emitting an event
server.listen(3000)
console.log('Listening on Port 3000...')


// This brings in the logger class
// const Logger = require('./logger')
// This creates an instance of logger
// const logger = new Logger()

// Because logger is an extension of the events class, you can use on directly
// Also remember this has to be defined before the event is called / emitted
// logger.on('MessageLogged', msg => {
//   console.log(`Listener called. Here's the message: ${msg.yo}`);
// });


// Here we can use the method in the Logger class
// logger.log('Tez was here.')
