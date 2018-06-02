const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var { authenticate } = require('./middleware/authenticate');

const UserController = require("./controllers/UserController");

var app = express();
const port = 3000;

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


app.listen(port, () => {
  console.log(`Listening on ${port}.`);
});

module.exports = { app };
