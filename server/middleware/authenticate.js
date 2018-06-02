const jwt = require('jsonwebtoken');
const MODELS = require('../models');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  var decoded;

  try {
    decoded = jwt.verify(token, "process.env.JWT_SECRET");
  } catch (e) { }

  MODELS.User.find({
    where: { id: decoded.id }
  }).then(function(user) {
      if (!user) { }
      req.user = user;
      req.token = token;
      next();
  });

};

module.exports = { authenticate };
