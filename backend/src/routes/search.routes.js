const express = require('express');

const searchControllers = require('../controllers/searchControllers');

const router = express.Router()

router.get(`/`, (req, res) => res.status(200).json('connected'))
router.get(`/:brand/:category/search`, searchControllers.getAll)

module.exports = router;