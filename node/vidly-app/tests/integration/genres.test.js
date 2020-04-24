const request = require('supertest');
let server;
const { Genre } = require('../../models/genre');

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../app');
  })
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({})
  })

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
  })

})