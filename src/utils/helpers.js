/**
 * Create an object composed of the picked object properties
 * @param {string[]} array
 * @returns {Object}
 */
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
module.exports = {
  sleep,
};
