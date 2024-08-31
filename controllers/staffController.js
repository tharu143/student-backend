const multer = require('multer');
const Staff = require('../models/staffModel');
const getNextStaffId = require('../getNextStaffId');

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
    try {
      const employeeId = await getNextStaffId();
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
      console.error('Error creating staff:', error);
      res.status(500).json({ error: 'Failed to create staff' });
    }
  },
];

// Search staff by name
exports.searchStaffByName = async (req, res) => {
  try {
    const name = req.query.name;
    const staff = await Staff.find({ name: new RegExp(name, 'i') });
    res.json(staff);
  } catch (error) {
    console.error('Error searching staff by name:', error);
    res.status(500).send('Server error');
  }
};

// Search staff by employeeId
exports.searchStaffByEmployeeId = async (req, res) => {
  try {
    const query = req.query.query || "";
    const staff = await Staff.find({ employeeId: query });
    res.status(200).json(staff);
  } catch (error) {
    console.error("Error searching staff by employeeId:", error);
    res.status(500).json({ error: "Failed to search staff by employeeId" });
  }
};
