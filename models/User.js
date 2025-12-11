const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  anonymous_name: {
    type: String,
    required: false,
  },
  no_hp: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatarUrl: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
