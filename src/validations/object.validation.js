const Joi = require('@hapi/joi');

const createObject = {
  body: Joi.object().required(),
};

module.exports = {
  createObject,
};
