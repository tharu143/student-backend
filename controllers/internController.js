const Intern = require('../models/internModel');
const path = require('path');
const fs = require('fs');

// Helper function for handling file uploads
const uploadFile = (file, folder) => {
  if (!file) return '';
  const fileName = Date.now() + path.extname(file.name);
  const filePath = path.join(__dirname, '../uploads', folder, fileName);
  file.mv(filePath, (err) => {
    if (err) throw err;
  });
  return fileName;
};

// Create a new intern
exports.createIntern = async (req, res) => {
  try {
    const {
      collegeName, internType, paymentStatus, paymentAmount, startDate, endDate, dob, phoneNo, mailId, githubId, linkedinId, workDetails, certificateProvided, name, address
    } = req.body;

    const reportFile = uploadFile(req.files?.reportFile, 'reports');
    const aadhaarPic = uploadFile(req.files?.aadhaarPic, 'aadhaar');
    const studentPic = uploadFile(req.files?.studentPic, 'students');

    const newIntern = new Intern({
      collegeName, internType, paymentStatus, paymentAmount, startDate, endDate, reportFile, dob, phoneNo, mailId, githubId, linkedinId, workDetails, certificateProvided, aadhaarPic, studentPic, name, address
    });

    await newIntern.save();
    res.status(201).json(newIntern);
  } catch (error) {
    console.error('Error creating intern:', error);  // Log the error
    res.status(500).json({ message: 'Error creating intern', error: error.message });
  }
};

// Search interns by name
exports.searchInternsByName = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ message: 'Name query parameter is required' });
    }

    console.log('Searching for interns with name:', name);

    const interns = await Intern.find({ name: { $regex: new RegExp(name, 'i') } });

    if (interns.length === 0) {
      return res.status(404).json({ message: 'No interns found with the given name' });
    }

    res.status(200).json(interns);
  } catch (error) {
    console.error('Error searching interns by name:', error);
    res.status(500).json({ message: 'Error searching interns', error: error.message });
  }
};

// Get all interns
exports.getInterns = async (req, res) => {
  try {
    const interns = await Intern.find();
    res.status(200).json(interns);
  } catch (error) {
    console.error('Error fetching interns:', error);
    res.status(500).json({ message: 'Error fetching interns', error: error.message });
  }
};

// Get intern by ID
exports.getInternById = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.status(200).json(intern);
  } catch (error) {
    console.error('Error fetching intern:', error);
    res.status(500).json({ message: 'Error fetching intern', error: error.message });
  }
};

// Update intern by ID
exports.updateIntern = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });

    const {
      collegeName, internType, paymentStatus, paymentAmount, startDate, endDate, dob, phoneNo, mailId, githubId, linkedinId, workDetails, certificateProvided, name, address
    } = req.body;

    if (req.files) {
      if (req.files.reportFile) intern.reportFile = uploadFile(req.files.reportFile, 'reports');
      if (req.files.aadhaarPic) intern.aadhaarPic = uploadFile(req.files.aadhaarPic, 'aadhaar');
      if (req.files.studentPic) intern.studentPic = uploadFile(req.files.studentPic, 'students');
    }

    intern.collegeName = collegeName || intern.collegeName;
    intern.internType = internType || intern.internType;
    intern.paymentStatus = paymentStatus !== undefined ? paymentStatus : intern.paymentStatus;
    intern.paymentAmount = paymentAmount || intern.paymentAmount;
    intern.startDate = startDate || intern.startDate;
    intern.endDate = endDate || intern.endDate;
    intern.dob = dob || intern.dob;
    intern.phoneNo = phoneNo || intern.phoneNo;
    intern.mailId = mailId || intern.mailId;
    intern.githubId = githubId || intern.githubId;
    intern.linkedinId = linkedinId || intern.linkedinId;
    intern.workDetails = workDetails || intern.workDetails;
    intern.certificateProvided = certificateProvided || intern.certificateProvided;
    intern.name = name || intern.name;
    intern.address = address || intern.address;

    await intern.save();
    res.status(200).json(intern);
  } catch (error) {
    console.error('Error updating intern:', error);
    res.status(500).json({ message: 'Error updating intern', error: error.message });
  }
};

// Delete intern by ID
exports.deleteIntern = async (req, res) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.status(200).json({ message: 'Intern deleted' });
  } catch (error) {
    console.error('Error deleting intern:', error);
    res.status(500).json({ message: 'Error deleting intern', error: error.message });
  }
};
