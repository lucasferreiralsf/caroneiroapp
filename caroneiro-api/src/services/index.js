const trips = require('./trips/trips.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(trips);
};
