const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  pregnant: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  conceptionDate: {
    type: Date,
    required: true,
  },
  favoritesPost: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publication" }],
});

module.exports = mongoose.model("User", UserSchema);
