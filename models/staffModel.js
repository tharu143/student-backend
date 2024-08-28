const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  employeeId: { type: String, unique: true },
  dateOfJoining: { type: Date, required: true },
  bankAccountNumber: { type: String, required: true },
  branch: { type: String, required: true },
  ifscCode: { type: String, required: true },
  offerLetter: { type: String },
  aadharXerox: { type: String },
  passportPhoto: { type: String },
  passbook: { type: String },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
