const mongoose = require("mongoose");

const appointementSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  appointementDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointement", appointementSchema);
