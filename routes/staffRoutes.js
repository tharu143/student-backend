const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Define routes
router.post('/', staffController.createStaff);
router.get('/searchById', staffController.searchStaffByEmployeeId);
router.get('/search', staffController.searchStaffByName);

module.exports = router;
