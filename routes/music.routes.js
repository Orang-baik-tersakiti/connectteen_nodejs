const express = require("express");
const router = express.Router();
const musicController = require("../controllers/music.controller");

router.get("/music", musicController.searchMusic);

module.exports = router;
