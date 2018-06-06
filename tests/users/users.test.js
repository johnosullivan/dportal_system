const expect = require('expect');
const request = require('supertest');

const { populateUsers, destory } = require('./../seeds/users');
const { app, shutdown } = require('./../../server/server');

before(populateUsers);

describe('POST /users', () => {

  it('should create a user with valid parameters', (done) => {
    const EMAIL = 'example@example.com';
    const PASSWORD = 'P@ssw0rd!';

    request(app)
      .post('/generatorkey')
      .send({email: EMAIL, password: PASSWORD})
      .expect(200)
      .expect((res) => {
        console.log(res.text);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

});

// Destory the seed data and shutdown server
after(destory);
after(function(done){
  shutdown(done);
})
