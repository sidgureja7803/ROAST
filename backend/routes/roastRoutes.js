const express = require('express');
const { getRoastLevels, createRoast } = require('../controllers/roastController');
const { validateRoastRequest } = require('../middlewares/validateInput');

const router = express.Router();

// Get available roast levels
router.get('/levels', getRoastLevels);

// Create a roast
router.post('/', validateRoastRequest, createRoast);

module.exports = router; 