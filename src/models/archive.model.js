const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const archiveSchema = mongoose.Schema(
  {
    document: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
archiveSchema.plugin(toJSON);
archiveSchema.plugin(paginate);

/**
 * @typedef Archive
 */
const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;
