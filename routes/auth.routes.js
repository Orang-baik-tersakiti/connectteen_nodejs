const express = require('express')
const { googleSignIn, googleSigInCallback } = require('../controllers/auth.controller')

const router = express.Router()

router.get('/google', googleSignIn)
router.get('/google/callback', googleSigInCallback)

module.exports = router