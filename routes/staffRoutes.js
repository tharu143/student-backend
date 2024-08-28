const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Define route for creating staff
router.post('/staff-details', staffController.createStaff);

module.exports = router;
