const httpStatus = require('http-status');
const moment = require('moment');
const { keyValue } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a object
 * @param {Object} objectBody
 * @returns {Promise<Object>}
 */
const createObject = async (objectBody) => {
  const updateBody = {};
  const keyArray = Object.keys(objectBody);
  const object = { total: [] };
  let keyvalue = {};
  await Promise.all(
    keyArray.map(async (key) => {
      keyvalue = await keyValue.isKeyTaken(key);
      if (keyvalue) {
        keyvalue.history.push({ key: keyvalue.key, value: keyvalue.value, timestamp: keyvalue.timestamp });
        keyvalue.key = key;
        keyvalue.value = objectBody[key]; // assuming only single key value pair asked in the problem.
        keyvalue.timestamp = moment(new Date().valueOf()).unix();
        const tmp = await updateObjectById(keyvalue._id, keyvalue);
        object.total.push({ key: tmp.key, value: tmp.value, timestamp: tmp.timestamp });
      } else {
        updateBody.key = key;
        updateBody.value = objectBody[key]; // assuming only single key value pair asked in the problem.
        updateBody.timestamp = moment(new Date().valueOf()).unix();
        const tmp = await keyValue.create(updateBody);
        object.total.push({ key: tmp.key, value: tmp.value, timestamp: tmp.timestamp });
      }
    })
  );
  return object.total;
};

/**
 * Query for objects
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryObjects = async (filter = {}) => {
  let result = {};
  let objects = {};
  const { timestamp } = filter;
  if (filter.timestamp) {
    objects = await keyValue.find({ key: filter.key });
    if (!objects.length) throw new ApiError(httpStatus.NOT_FOUND, 'Object not found');
    const counts = objects[0].history;
    counts.push({ key: objects[0].key, value: objects[0].value, timestamp: objects[0].timestamp });
    const goal = timestamp;
    result = counts.reduce(function (prev, curr) {
      return Math.abs(curr.timestamp - goal) < Math.abs(prev.timestamp - goal) ? curr : prev;
    });
  } else {
    objects = await keyValue.find(filter);
    if (!objects.length) throw new ApiError(httpStatus.NOT_FOUND, 'Object not found');
    result.key = objects[0].key;
    result.value = objects[0].value;
    result.timestamp = objects[0].timestamp;
  }
  return result;
};

/**
 * Get object by id
 * @param {ObjectId} id
 * @returns {Promise<Object>}
 */
const getObjectById = async (id) => {
  return keyValue.findById(id);
};

/**
 * Update object by id
 * @param {ObjectId} objectId
 * @param {Object} updateBody
 * @returns {Promise<Object>}
 */
const updateObjectById = async (objectId, updateBody) => {
  const object = await getObjectById(objectId);
  if (!object) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Object not found');
  }
  if (updateBody.email && (await keyValue.isEmailTaken(updateBody.email, objectId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(object, updateBody);
  await object.save();
  return object;
};

module.exports = {
  createObject,
  queryObjects,
  getObjectById,
  updateObjectById,
};
