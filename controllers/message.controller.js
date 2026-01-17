const { sanitizeMessage, sanitizeMessages } = require("../helpers/utils");
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
    const { recipient_name, message, song_id, song_image, song_artist, song_name } =
      req.body;

    if (
      !recipient_name ||
      !message ||
      !song_id ||
      !song_image ||
      !song_artist ||
      !song_name
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const newMessage = await Message.create({
      recipient_name,
      message,
      song_id,
      song_image,
      song_artist,
      song_name,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: sanitizeMessage(newMessage),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { search, limit = 10 } = req.query;

    const query = {};

    // Search recipient_name & message
    if (search) {
      query.$or = [
        { recipient_name: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: sanitizeMessages(messages),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMessagesHistory = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      data: sanitizeMessages(messages),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const mongoose = require("mongoose");

exports.getOneMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Message tidak ditemukan",
      });
    }

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: sanitizeMessage(message),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Format ID tidak valid",
      });
    }

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message tidak ditemukan",
      });
    }

    await Message.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Message berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};