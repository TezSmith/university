const request = require('supertest');
const { Rental } = require('../../models/rental')
const { Movie } = require('../../models/movie')
const { User } = require('../../models/user')
const mongoose = require('mongoose')
const moment = require('moment');

describe ('/vidly/api/returns', () => {
  let server;
  let customerId;
  let movieId
  let rental;
  let movie;
  let token;

  const exec = async() => {
    return request(server)
      .post('/vidly/api/returns')
      .send({ customerId, movieId })
      .set('x-auth-token', token)
  }
  
  beforeEach( async() => {
    server = require('../../app');
    customerId = mongoose.Types.ObjectId(),
    movieId = mongoose.Types.ObjectId(),
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: '12345',
      dailyRentalRate: 2,
      genre: { name: '12345'},
      numberInStock: 10
    });

    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345'
      },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2,
      }    
    });

    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });

  it('should return 401 if user is not logged in', async () => {
    token = ''
    const res = await exec()
    expect(res.status).toBe(401)
  });

  it('should return 400 if the customer id is not provided', async () => {
    customerId = ''
    const res = await exec()
    expect(res.status).toBe(400)
  });

  it('should return 400 if the movie id is not provided', async () => {
    movieId = ''
    const res = await exec()
    expect(res.status).toBe(400)
  });

  it('should return 404 if there is no rental found for this customer/movie', async () => {
    await Rental.deleteMany({});
    const res = await exec()
    expect(res.status).toBe(404)
  });

  it('should return 400 if return is already processed', async () => {
    rental.dateReturned = new Date();
    await rental.save();

    const res = await exec()
    expect(res.status).toBe(400)
  });

  it('should return 200 if valid request is received', async () => {
    const res = await exec()
    expect(res.status).toBe(200)
  });

   it('should set return Date if input is valid', async () => {
     const res = await exec();

     const rentalinDb = await Rental.findById(rental._id)
     const diff = new Date() - rentalinDb.dateReturned;

     expect(rentalinDb).toHaveProperty('dateReturned');
     expect(diff).toBeLessThan(10 *  1000);
   });

   it('should set rental fee if input is valid', async () => {
     rental.dateOut = moment().add(-7, 'days').toDate()
    
     await rental.save()
     
     const res = await exec();
     const rentalinDb = await Rental.findById(rental._id);

     expect(rentalinDb).toHaveProperty('rentalFee');
     expect(rentalinDb.rentalFee).toBe(14);
   });

   it('should increase the movie stock', async () => {
     const res = await exec();
     const movieinDb = await Movie.findById(movie._id);

    //  expect(movieinDb).toHaveProperty('rentalFee');
     expect(movieinDb.numberInStock).toBe(movie.numberInStock + 1);
   })

   it('should return the rental if input is valid', async () => {
     const res = await exec();
     const rentalinDb = await Rental.findById(rental._id);

     expect(Object.keys(res.body)).toEqual(
       expect.arrayContaining([
         'dateOut',
         'dateReturned',
         'rentalFee',
         'customer',
         'movie'
       ])
     );
   })


})