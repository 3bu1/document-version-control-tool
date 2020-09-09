const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const objectSchema = mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: String,
    },
    history: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);
// const objectSchema = mongoose.Schema();
// add plugin that converts mongoose to json
objectSchema.plugin(toJSON);
objectSchema.plugin(paginate);

/**
 * Check if key is taken
 * @param {string} key - The object key
 * @returns {Promise<boolean>}
 */
objectSchema.statics.isKeyTaken = async function (key) {
  const obj = await this.findOne({ key });
  return obj;
};

/**
 * @typedef keyValue
 */
const keyValue = mongoose.model('keyValue', objectSchema);

module.exports = keyValue;
