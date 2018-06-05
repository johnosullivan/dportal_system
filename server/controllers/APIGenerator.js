const MODELS = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class APIGenerator {

  static createKey(req, res) {

    var d = new Date().getTime();

	  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxx'.replace(/[xy]/g, function(c)
	  {
		  var r = (d + Math.random()*16)%16 | 0;
		  d = Math.floor(d/16);
		  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	  });


    res.json({ "api_key":uuid });
  }


}

module.exports = APIGenerator;
