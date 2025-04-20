const Lecture = require('../model/Lecture');
const Instructor = require('../model/Instructor');
const { isTimeConflict } = require('../utils/schedulerUtils');

exports.scheduleLecture = async (req, res) => {
  try {
    const { course, instructor, date, startTime, endTime } = req.body;

    // Check for time conflict
    const existingLectures = await Lecture.find({
      instructor,
      date: new Date(date),
    });

    const conflict = existingLectures.some(lec =>
      isTimeConflict(startTime, endTime, lec.startTime, lec.endTime)
    );

    if (conflict) {
      return res.status(400).json({ error: 'Instructor already has a lecture in this time slot' });
    }

    const newLecture = new Lecture({ course, instructor, date, startTime, endTime });
    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (err) {
    res.status(500).json({ error: 'Lecture scheduling failed' });
  }
};

exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('instructor');
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update attendance
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { attendanceStatus } = req.body;

  try {
    const updated = await Lecture.findByIdAndUpdate(
      id,
      { attendanceStatus },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Lecture not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};