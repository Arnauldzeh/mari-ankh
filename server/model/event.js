const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  organiser: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
