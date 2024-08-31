const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const internRoutes = require('./routes/internRoutes');
const reportSheetRoutes = require('./routes/reportSheetRoutes');
const feesRoutes = require('./routes/feesRoutes');
const chartRoutes = require('./routes/chartRoutes');
const certificatesRoutes = require('./routes/certificatesRoutes');
const staffRoutes = require('./routes/staffRoutes'); // Import staff routes
const staffReportSheetRoutes = require('./routes/staffReportSheetRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/interns', internRoutes);
app.use('/api/report-sheets', reportSheetRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/auth', authRoutes); // Ensure this line is correct
app.use('/api', chartRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/staff', staffRoutes); // Add staff routes
app.use('/api/report-sheets', staffReportSheetRoutes);

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
