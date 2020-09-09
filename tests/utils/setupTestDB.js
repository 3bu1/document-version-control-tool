const mongoose = require('mongoose');
const config = require('../../src/config/config');
const logger = require('../../src/config/logger');

const setupTestDB = () => {
  beforeAll(async () => {
    mongoose
      .connect(config.mongoose.url, config.mongoose.options)
      .then(async () => {
        //logger.info('Connected to MongoDB');
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) => {
        //logger.info(`Emptying collection ${collection.name}`);
        collection.deleteMany({});
      })
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
