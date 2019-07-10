const trips = require('./trips/trips.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(trips);
  app.configure(users);
};
