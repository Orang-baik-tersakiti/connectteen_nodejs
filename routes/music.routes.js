const express = require('express')
const { getMusic } = require('../controllers/music.controller')

const router = express.Router()

router.get('/music', getMusic)

module.exports = router