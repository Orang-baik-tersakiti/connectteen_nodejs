const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessagesHistory,
  getOneMessage,
  getMessages,
} = require("../controllers/message.controller");
const { authMiddleware } = require("../middleware/auth");

router.post("/messages", authMiddleware, sendMessage);
router.get("/messages", getMessages);
router.get("/messages/me", authMiddleware, getMessagesHistory);
router.get("/messages/:id", getOneMessage);

module.exports = router;
