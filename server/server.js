const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CONFIGS = require('../config/server');
const port = CONFIGS.port;

// Middleware for the token authentication
var { authenticate } = require('./middleware/authenticate');

// The controllers from the different routes
const UserController = require("./controllers/UserController");
const APIGenerator = require("./controllers/APIGenerator");

var apm = require('elastic-apm-node').start({
  serviceName: 'dportal_system',
  secretToken: '',
  serverUrl: '',
});

var err = new Error('Ups, something broke!')

apm.captureError(err)

// Creates an express app
var app = express();
// Sets the body parser
app.use(bodyParser.json());
// POST /users
app.post('/users', UserController.postUser);
// GET /users/me (Private route)
app.get('/users/me', authenticate, UserController.getUser);
// POST /users/login {email, password}
app.post('/users/login', UserController.userLogin);
// DELETE /users/me/token
app.delete('/users/me/token', authenticate, UserController.deleteToken);

app.post('/generatorkey', APIGenerator.createKey);

// Begins the app listening on port
var server = app.listen(port, () => {
  //console.log(`dportal running on port: ${port}.`);
});

function shutdown(done) {
  //console.log(`dportal has shutdown`);
  server.close(done);
}

module.exports = { app, shutdown };
