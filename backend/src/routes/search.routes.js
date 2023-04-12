const express = require('express');

const searchControllers = require('../controllers/searchControllers');

const router = express.Router()

router.get(`/:brand/:category`, searchControllers.getAll)

module.exports = router;