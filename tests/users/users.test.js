const expect = require('expect');
const request = require('supertest');

const { beforeTest, teardown, UserOne, getUser, setUser, getHeader, setHeader } = require('./../seeds/users');
const { app, shutdown } = require('./../../server/server');

before(beforeTest);

describe('POST /users', () => {
  it('should create a user with valid user object data', (done) => {
    request(app).post('/users').send({
      email: UserOne.email,
	    password: UserOne.password,
	    firstName: UserOne.firstName,
	    lastName: UserOne.lastName
    }).expect(200).expect((res) => {
      setHeader(res.headers);
      setUser(JSON.parse(res.text));
      const user = getUser();
      expect(getHeader()['x-auth']).toBeTruthy();
      expect(user.id).toBeTruthy();
      expect(user.email).toBe(UserOne.email);
    }).end((err) => {
      if (err) {
        return done(err);
      }
      done();
    });

  });

  it('should not create a user with invalid parameters - password wrong size', (done) => {
    request(app)
      .post('/users')
      .send({
        email: UserOne.email,
  	    password: "123",
  	    firstName: UserOne.firstName,
  	    lastName: UserOne.lastName
      })
      .expect(400)
      .end(done);
  });

  it('should not create a user if the email is already taken', (done) => {
    request(app)
      .post('/users')
      .send({
        email: UserOne.email,
  	    password: UserOne.password,
  	    firstName: UserOne.firstName,
  	    lastName: UserOne.lastName
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login the user with valid parameters and return authentication token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: UserOne.email,
  	    password: UserOne.password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should reject the user with invalid parameters', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: UserOne.email,
  	    password: "wrong"
      })
      .expect(400)
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('GET /users/me', () => {
  it('should get the user with valid token - testing middleware', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', getHeader()['x-auth'])
      .expect(200)
      .expect((res) => {
        const user = JSON.parse(res.text);
        expect(user.id).toBeTruthy();
        expect(user.email).toBe(UserOne.email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('DELETE /users/me/token', () => {
  it('should delete the authentication token of the current logged-in user via header(`x-auth`) token ', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', getHeader()['x-auth'])
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should get the user to check token was deleted - token count should be one', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', getHeader()['x-auth'])
      .expect(200)
      .expect((res) => {
        const user = JSON.parse(res.text);
        expect(user.email).toBe(UserOne.email);
        expect(user.tokens.length).toBe(1);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

after(teardown);
after(function(done){
  shutdown(done);
})
