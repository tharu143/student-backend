const express = require('express');
const router = express.Router();
const Intern = require('../models/internModel');

// Search interns by name
router.get('/search', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Name parameter is required' });
  }

  try {
    const interns = await Intern.find({
      name: new RegExp(name, 'i')
    });
    res.json(interns);
  } catch (error) {
    console.error('Error fetching interns:', error);
    res.status(500).json({ message: 'Error fetching interns', error: error.message });
  }
});

module.exports = router;
