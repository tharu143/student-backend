const Counter = require('./models/counterModel');

const initializeCounter = async () => {
  const count = await Counter.findById('employeeid');
  if (!count) {
    const newCount = new Counter({
      _id: 'employeeid',
      sequence_value: 600, // Starting value
    });
    await newCount.save();
  }
};

initializeCounter().catch(console.error);
