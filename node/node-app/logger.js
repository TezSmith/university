const EventEmitter = require('events');

const url = 'http://mylogger.io/log'

class Logger extends EventEmitter {
  log = (msg) => {
  console.log("This would be the return of log(): ", msg)
  // Raise an event
  this.emit('MessageLogged', {yo: 'Whoa'});
  }
}


module.exports = Logger;