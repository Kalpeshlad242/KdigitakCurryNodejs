const Lecture = require('../model/Lecture');

exports.getAnalytics = async (req, res) => {
  try {
    const totalLectures = await Lecture.countDocuments();

    const attendedCount = await Lecture.countDocuments({ attendanceStatus: 'Attended' });
    const notAttendedCount = await Lecture.countDocuments({ attendanceStatus: 'Not Attended' });

    const lecturesPerCourse = await Lecture.aggregate([
      {
        $group: {
          _id: "$courseName",
          count: { $sum: 1 }
        }
      }
    ]);

    const upcomingLectures = await Lecture.find({ lectureDate: { $gte: new Date() } }).sort('lectureDate');

    res.json({
      totalLectures,
      attendedCount,
      notAttendedCount,
      lecturesPerCourse,
      upcomingLectures
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
