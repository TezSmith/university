
const log = (req, res, next) => {
  console.log('Logging...');
  next();
};

const authenticate = (req, res, next) => {
  console.log('Authenticating...');
  next();
};

module.exports.log = log;
module.exports.authenticate = authenticate;

// class Log {
//   log = (req, res, next) => {
//     console.log('Logging...');
//     next();
//   };

//   authenticate = (req, res, next) => {
//     console.log('Authenticating...');
//     next();
//   };
// }

// module.exports = Log;
