const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    recipient_name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    song_id: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
