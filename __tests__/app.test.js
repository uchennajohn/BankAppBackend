const request = require('supertest');
const app = require('../app');

describe('POST /auth/signup', () => {
    it('should return a token on successful signup', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          email: 'testuser@example.com',
          password: 'testpassword',
          name: 'Test User',
          accountNumber: '1234567890'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.token).toBeDefined();
    });
  
    it('should return a 400 error if missing required fields', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          email: 'testuser@example.com',
          password:"testpassword",
          accountNumber: "1234567890"
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('Bad Request');
    });
  });
  
  
  
  
  
  

