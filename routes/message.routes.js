const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessagesHistory,
  getOneMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/message.controller");
const { authMiddleware } = require("../middleware/auth");

router.post("/messages", authMiddleware, sendMessage);
router.get("/messages", getMessages);
router.get("/messages/me", authMiddleware, getMessagesHistory);
router.get("/messages/:id", getOneMessage);
router.delete("/messages/:id", deleteMessage);

module.exports = router;
