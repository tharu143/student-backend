const Staff = require('../backend/models/staffModel');

async function getNextStaffId() {
  try {
    const latestStaff = await Staff.findOne({}, {}, { sort: { employeeId: -1 } });
    if (!latestStaff) return 'zhahisf6001'; // Starting ID if no staff members exist

    const lastId = parseInt(latestStaff.employeeId.replace('zhahisf', ''));
    const nextId = lastId + 1;
    return `zhahisf${nextId.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error('Error generating staff ID:', error);
    throw error;
  }
}

module.exports = getNextStaffId;
