const expect = require('expect');
const request = require('supertest');

const { populateUsers, destory } = require('./../seeds/users');

const { app } = require('./../../server/server');

console.log(app);

before(populateUsers);

describe('POST /users', () => {
  it('should create a user with valid parameters', (done) => {
    const EMAIL = 'example@example.com';
    const PASSWORD = 'P@ssw0rd!';

    done();
  });
});

after(destory);
