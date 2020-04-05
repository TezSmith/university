const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.')
  
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivate'))
    req.user = decoded;
    next();
  } 
  catch(ex) {
    res.status(400).send('Invalid token')
  }
}

// This method won't be added to app.js because we want to use this method selectively
module.exports = auth;