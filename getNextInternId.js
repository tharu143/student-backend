const Intern = require('./models/internModel'); // Adjust path if necessary

async function getNextInternId() {
  try {
    const latestIntern = await Intern.findOne({}, {}, { sort: { internId: -1 } });
    if (!latestIntern) return 'zhahi0001'; // Starting ID if no interns exist

    const lastId = parseInt(latestIntern.internId.replace('zhahi', ''));
    const nextId = lastId + 1;
    return `zhahi${nextId.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error('Error generating intern ID:', error);
    throw error;
  }
}

module.exports = getNextInternId;
