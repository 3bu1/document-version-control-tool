const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { objectService } = require('../services');

const createObject = catchAsync(async (req, res) => {
  const object = await objectService.createObject(req.body);
  res.status(httpStatus.CREATED).send(object);
});

const getObjects = catchAsync(async (req, res) => {
  const filter = pick(req.params, ['key']);
  const filterTimestamp = pick(req.query, ['timestamp']);
  Object.assign(filter, filterTimestamp);
  const result = await objectService.queryObjects(filter);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Object not found');
  }
  res.send(result);
});

const getObject = catchAsync(async (req, res) => {
  const object = await objectService.getObjectById(req.params.objectId);
  if (!object) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Object not found');
  }
  res.send(object);
});

module.exports = {
  createObject,
  getObjects,
  getObject,
};
