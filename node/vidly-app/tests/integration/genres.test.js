const request = require('supertest');
let server;
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

describe('/api/genres', () => {
  
  beforeEach(() => {
    server = require('../../app');
  });

  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });
  
  describe('GET /', () => {
    
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' }
      ])

      const res = await request(server).get('/vidly/api/genres');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy()
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    it('should return one (1) genre of valid id is passed', async () => {
      const genre = new Genre({ name: 'genre1'})
      await genre.save();

      const res = await request(server).get(`/vidly/api/genres/${genre._id}`);
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name', genre.name)
    })

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/vidly/api/genres/1');
      expect(res.status).toBe(404)
    })

    it('should return 404 if no genre with given id exists', async () => {
      const id = mongoose.Types.ObjectId; 
      const res = await request(server).get(`/vidly/api/genres/${id}`);
      expect(res.status).toBe(404)
  })
  })

  describe('POST /', () => {
  // Define the happy path, and then in each test change the 
  // one paramter that clearly aligns with the name of the test

  let token;
  let name;
  
  const exec = async () => {
    return await request(server)
      .post('/vidly/api/genres')
      .set('x-auth-token', token)
      .send({ name });
  }

  beforeEach(() => {
    // Set values for happy path
    token = new User().generateAuthToken();
    name = 'genre1'
  })

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401)
    })


    it('should return 400 if genre is less than 5 characters', async () => {
      name = '1234'
      const res = await exec();

      expect(res.status).toBe(400)
    })

    it('should return 400 if genre is greater than 50 characters', async () => {
      name = new Array(52).join('a');
      const res = await exec();

      expect(res.status).toBe(400);
    });
    
    it('should save genre if it is valid', async () => {      
      await exec();
      const genre = await Genre.find({ name: 'genre1'})

      expect(genre).not.toBeNull();
    });

    it('should return genre if it is valid', async () => {
      const res = await exec();
      
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  })

  describe('PUT /:id', () => {
    // Make a request to the server
    // Make a valid genre
    // Make an authorized token
    // Clean up database 
    // Make a test for a valid object, but it doesn't exist in database
    let token
    let newName 
    let genre
    let id 

    const exec = async () => {
      return await request(server)
        .put(`/vidly/api/genres/${id}`)
        .set('x-auth-token', token)
        .send({ name: newName })
    }
    
    beforeEach( async() => {
      genre = new Genre({ name: 'genre1' })
      await genre.save();

      token = new User().generateAuthToken();
      id = genre._id;
      newName = 'UpdatedName'
    });

    it('should return 404 if genre name is less than 5 characters', async () => {
      newName = '1234'
      const res = await exec();

      expect(res.status).toBe(400)
    })

    it('should return 404 if genre name is more than 50 characters', async () => {
      newName = new Array(52).join('a')
      const res = await exec();

      expect(res.status).toBe(400)
    })

    it('should return 404 if genre id is invalid', async () => {
      id = '1'
      const res = await exec();

      expect(res.status).toBe(404)
    })

    it('should return 404 if genre with the given id was not found', async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should update the genre if input is valid', async () => {
      await exec();
      const updatedGenre = await Genre.findById(genre._id);

      expect(updatedGenre.name).toBe(newName);
    });
    
    it('should return the updated genre if valid', async () => {
      const res = await exec();  

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'UpdatedName')
    })

  })

  describe('DELETE /:id', () => {
    let id
    let token 
    let admin
    let genre
    
    const exec = async () => {
      return await request(server)
      .delete(`/vidly/api/genres/${id}`)
      .set('x-auth-token', token)
      .send();
    }

    beforeEach( async() => {
      token = new User({ isAdmin: true }).generateAuthToken();
      genre = new Genre({ name: 'genre1' })
      await genre.save();

      id = genre._id;
    })

    it('should return 401 if user is not logged in', async () => {
      token = ''
      const res = await exec()
      
      expect(res.status).toBe(401)
    })

    it('should return 403 if user is not an admin', async () => {
      token = new User({ isAdmin: false }).generateAuthToken();
      const res = await exec()
      
      expect(res.status).toBe(403)
    })

    it('should return 404 if genre id is invalid', async () => {
      id = 1
      const res = await exec()
      
      expect(res.status).toBe(404)
    })

    it('should return 404 if no genre with the given id was found', async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should delete the genre if input is valid', async () => {
      await exec();
      const genreInDb = await Genre.findById(id);

      expect(genreInDb).toBeNull();
    });

    it('should return the removed genre', async () => {
      const res = await exec();
      // console.log(res)

      expect(res.body).toHaveProperty('_id', genre._id.toHexString());
      expect(res.body).toHaveProperty('name', genre.name);
    })

  })

})