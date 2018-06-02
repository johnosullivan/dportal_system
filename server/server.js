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
// Begins the app listening on port
app.listen(port, () => { console.log(`dportal running on port: ${port}.`); });

module.exports = { app };
