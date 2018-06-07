const { sequelize, User } = require('./../../server/models');

// The first user object
const UserOne = {
  email: "johndoe@imbrex.io",
  password: "fytdt&*^32987(&*)@jdaII*1@js!",
  firstName:"John",
  lastName:"Doe"
}

// Will hold user one vars for testing
var UserOneResponse = {};
var UserOneHeaders = {};

// Getter/Setter for
const setUser = (data) => { UserOneResponse = data; }
const getUser = () => { return UserOneResponse; }
const setHeader = (data) => { UserOneHeaders = data; }
const getHeader = () => { return UserOneHeaders; }

const beforeTest = (done) => {
  // Cleans the user vars for testing
  setUser({});
  setHeader({});
  done();
};

const teardown = (done) => {
  // Destroys the user after running the tests
  User.destroy({
    where: { id: getUser().id }
  }).then(function (result) {
    sequelize.close();
    done();
  }).catch(function (error) {
    console.error(error);
    sequelize.close();
    done();
  });

};

module.exports = {
  beforeTest,
  teardown,
  UserOne,
  UserOneResponse,
  setUser,
  getUser,
  setHeader,
  getHeader
};
