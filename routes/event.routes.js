const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth");

// admin
router.post("/events", authMiddleware, adminOnly, eventController.createEvent);
router.delete(
  "/events/:id",
  authMiddleware,
  adminOnly,
  eventController.deleteEvent
);
router.get(
  "/events/:id/registrants",
  authMiddleware,
  adminOnly,
  eventController.getRegistrants
);

// public / user
router.get("/events", eventController.getEvents);
router.get("/events/:id", eventController.getEventById);
router.post(
  "/events/:id/register",
  authMiddleware,
  eventController.registerEvent
);

module.exports = router;
