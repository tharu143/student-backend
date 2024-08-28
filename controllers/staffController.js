const multer = require('multer');
const path = require('path');
const Staff = require('../models/staffModel'); // Ensure this model is defined correctly
const getNextStaffId = require('../helpers'); // Ensure this function is defined correctly

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Create a new staff member
exports.createStaff = [
  upload.fields([
    { name: 'offerLetter', maxCount: 1 },
    { name: 'aadharXerox', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 },
    { name: 'passbook', maxCount: 1 },
  ]),
  async (req, res) => {
    console.log('Files:', req.files); // Log files received
    console.log('Body:', req.body);   // Log form data

    try {
      const nextId = await getNextStaffId(); // Generate new staff ID
      const employeeId = `zhahist${nextId.toString().padStart(3, '0')}`;

      const staff = new Staff({
        ...req.body,
        employeeId,
        offerLetterPath: req.files['offerLetter'] ? req.files['offerLetter'][0].path : undefined,
        aadharXeroxPath: req.files['aadharXerox'] ? req.files['aadharXerox'][0].path : undefined,
        passportPhotoPath: req.files['passportPhoto'] ? req.files['passportPhoto'][0].path : undefined,
        passbookPath: req.files['passbook'] ? req.files['passbook'][0].path : undefined,
      });

      await staff.save();
      res.status(201).json(staff);
    } catch (error) {
      console.error('Error creating staff:', error.message);
      res.status(500).json({ error: 'Failed to create staff' });
    }
  },
];
