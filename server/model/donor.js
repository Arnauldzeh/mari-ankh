const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  DoB: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  recentVaccins: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Donor", donorSchema);
