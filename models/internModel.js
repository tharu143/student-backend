const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  internType: { type: String, required: true },
  paymentStatus: { type: Boolean, default: false },
  paymentAmount: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  reportFile: { type: String },
  dob: { type: Date },
  phoneNo: { type: String },
  mailId: { type: String },
  githubId: { type: String },
  linkedinId: { type: String },
  workDetails: { type: String },
  certificateProvided: { type: String, enum: ['Yes', 'No'], default: 'No' },
  aadhaarPic: { type: String },
  studentPic: { type: String },
  name: { type: String, required: true },
  address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema);
