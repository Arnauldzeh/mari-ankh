const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Publication", publicationSchema);
