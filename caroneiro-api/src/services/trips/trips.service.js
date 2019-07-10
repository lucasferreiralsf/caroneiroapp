// Initializes the `trips` service on path `/trips`
const createService = require('feathers-mongoose');
const createModel = require('../../models/trips.model');
const hooks = require('./trips.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/trips', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('trips');

  service.hooks(hooks);
};
