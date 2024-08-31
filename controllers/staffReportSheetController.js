// controllers/staffReportSheetController.js
const StaffReportSheet = require('../models/StaffReportSheet');

exports.upsertReportSheet = async (req, res) => {
  const { staffId, reportLink } = req.body;

  try {
    // Check if a report sheet already exists for the staff
    let reportSheet = await StaffReportSheet.findOne({ staffId });

    if (reportSheet) {
      // Update existing report sheet
      reportSheet.reportLink = reportLink;
      reportSheet = await reportSheet.save();
    } else {
      // Create a new report sheet
      reportSheet = new StaffReportSheet({
        staffId,
        reportLink,
      });
      await reportSheet.save();
    }

    res.status(200).json(reportSheet);
  } catch (error) {
    console.error("Error upserting report sheet:", error);
    res.status(500).json({ message: 'Error upserting report sheet' });
  }
};
