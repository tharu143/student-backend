// models/StaffReportSheet.js
const mongoose = require('mongoose');

const staffReportSheetSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff', // Reference to the Staff model
    required: true,
  },
  reportLink: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('StaffReportSheet', staffReportSheetSchema);