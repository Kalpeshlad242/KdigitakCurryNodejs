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
