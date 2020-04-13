const { User } = require('../models/user')
const jwt = require('jsonwebtoken');
const config = require('config')
const mongoose = require('mongoose')

describe('user.generateAuthToken', () => {
  it('gives valid user a json web token', () => {
    // My version
    // const user = new User({ name: 'Myra', email: 'myra@gmail.com', password: 'cookies', isAdmin: false })
    // jwt.sign = jest.fn().mockReturnValue({ token: 'a' });
    // const result = user.generateAuthToken();
    // expect(jwt.sign).toHaveBeenCalled();
    // expect(result.token).toBe('a');

    const payload = { 
      _id: new mongoose.Types.ObjectId().toHexString(), 
      isAdmin: true 
    };
    const user = new User(payload)
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivate'))
    expect(decoded).toMatchObject(payload)
  });
});

