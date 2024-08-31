const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  bankAccountNumber: { type: String, required: true },
  branch: { type: String, required: true },
  ifscCode: { type: String, required: true },
  offerLetterPath: String,
  aadharXeroxPath: String,
  passportPhotoPath: String,
  passbookPath: String,
});

module.exports = mongoose.model('Staff', staffSchema);
