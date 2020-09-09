const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'document-revision-control-tool API documentation',
    version,
    license: {
      name: 'MIT',
      url: '',
    },
  },
  servers: [
    {
      url: `http://${config.url}:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
