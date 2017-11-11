const app = require('supertest')(require('../app'));
const jwt = require('jwt-simple');
const { expect } = require('chai');

describe('api', ()=> {
  describe('POST /api/tokens', ()=> {
    describe('with valid credentials', ()=> {
      it('returns a valid token', ()=> {
        const credentials = {
          username: 'Moe',
          password: 'moe'
        };
        const token = jwt.encode({ id: 1 }, 'foobar');
        return app.post('/api/tokens')
          .send(credentials)
          .expect(200)
          .then( result => {
            expect(result.body.token).to.equal(token);
          });
      });
    });
    describe('with invalid credentials', ()=> {
      it('returns a 401', ()=> {
        const credentials = {
          username: 'Moe',
          password: 'oe'
        };
        return app.post('/api/tokens')
          .send(credentials)
          .expect(401);
      });
    });
  });
  describe('GET /api/me', ()=> {
    describe('with valid token', ()=> {
      it('returns the correct user', ()=> {
        const token = jwt.encode({ id: 1 }, 'foobar');
        return app.get('/api/me')
          .set('auth', token)
          .expect(200)
          .then( result => {
            expect(result.body.favorite).to.equal('foo');
          });
      });
    });
    describe('with an invalid token', ()=> {
      it('returns a 401', ()=> {
        const token = jwt.encode({ id: 1 }, 'quq');
        return app.get('/api/me')
          .set('auth', token)
          .expect(401)
      });
    });
  });
  describe('GET /api/products', ()=> {
    it('returns 3 products', ()=> {
      return app.get('/api/products')
        .expect(200)
        .then(response => {
          expect(response.body.length).to.equal(3);
        });
    });
  });
});
