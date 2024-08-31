// routes/staffReportSheetRoutes.js
const express = require('express');
const router = express.Router();
const staffReportSheetController = require('../controllers/staffReportSheetController');

// Route for upserting a staff report sheet
router.post('/', staffReportSheetController.upsertReportSheet);

module.exports = router;