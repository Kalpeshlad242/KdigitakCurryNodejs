const mongoose = require('mongoose');
const Lecture = require('../model/Lecture');
const Instructor = require('../model/Instructor');
const { isTimeConflict } = require('../utils/schedulerUtils');

// Schedule a new lecture
exports.scheduleLecture = async (req, res) => {
  try {
    const { course, instructor, date, startTime, endTime } = req.body;

    // Validate input
    if (!course || !instructor || !date || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!mongoose.isValidObjectId(instructor)) {
      return res.status(400).json({ success: false, message: 'Invalid instructor ID' });
    }

    // Check for scheduling conflicts
    const existingLectures = await Lecture.find({
      instructor,
      date: new Date(date),
    });

    const hasConflict = existingLectures.some(lec =>
      isTimeConflict(startTime, endTime, lec.startTime, lec.endTime)
    );

    if (hasConflict) {
      return res.status(400).json({
        success: false,
        message: 'Instructor already has a lecture in this time slot',
      });
    }

    const newLecture = new Lecture({ course, instructor, date, startTime, endTime });
    await newLecture.save();

    res.status(201).json({ success: true, message: 'Lecture scheduled', data: newLecture });
  } catch (err) {
    console.error('Lecture scheduling error:', err);
    res.status(500).json({ success: false, message: 'Lecture scheduling failed', error: err.message });
  }
};

// Get all lectures
exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('instructor');
    res.status(200).json({ success: true, data: lectures });
  } catch (err) {
    console.error('Error fetching lectures:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch lectures', error: err.message });
  }
};

// Update attendance status of a lecture
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { attendanceStatus } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid lecture ID' });
    }

    if (!attendanceStatus) {
      return res.status(400).json({ success: false, message: 'Attendance status is required' });
    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
      id,
      { attendanceStatus },
      { new: true }
    );

    if (!updatedLecture) {
      return res.status(404).json({ success: false, message: 'Lecture not found' });
    }

    res.status(200).json({ success: true, message: 'Attendance updated', data: updatedLecture });
  } catch (err) {
    console.error('Error updating attendance:', err);
    res.status(500).json({ success: false, message: 'Failed to update attendance', error: err.message });
  }
};
