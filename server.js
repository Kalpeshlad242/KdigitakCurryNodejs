const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const instructorRoutes = require('./routes/instructorRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(morgan('combined')); // Detailed logging for all requests
app.use(cors()); // Enabling CORS for all origins

app.use('/api/v1/instructors', instructorRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/lectures', lectureRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// MongoDB Connection with retry logic
async function connectWithRetry() {
  try {
    // Removed deprecated options `useNewUrlParser` and `useUnifiedTopology`
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed, retrying in 5 seconds...', err);
    setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
  }
}
connectWithRetry();

// Starting the server after MongoDB connection is established
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  }
});

// Graceful shutdown for MongoDB connection on process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});
