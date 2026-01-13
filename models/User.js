const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    anonymous_name: {
      type: String,
    },

    guestId: {
      type: String,
      unique: true,
      sparse: true,
    },

    no_hp: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "user", "guest"],
      default: "guest",
    },

    avatarUrl: {
      type: String,
    },

    isGuest: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
