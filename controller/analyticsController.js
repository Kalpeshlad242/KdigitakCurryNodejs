const Lecture = require('../model/Lecture');

exports.getAnalytics = async (req, res) => {
  try {
    const [totalLectures, attendedCount, notAttendedCount, lecturesPerCourse, upcomingLectures] = await Promise.all([
      Lecture.countDocuments(),
      Lecture.countDocuments({ attendanceStatus: 'Attended' }),
      Lecture.countDocuments({ attendanceStatus: 'Not Attended' }),
      Lecture.aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'course',
            foreignField: '_id',
            as: 'courseInfo'
          }
        },
        { $unwind: '$courseInfo' },
        {
          $group: {
            _id: '$courseInfo.name',
            count: { $sum: 1 }
          }
        }
      ]),
      Lecture.find({ lectureDate: { $gte: new Date() } }).sort('lectureDate')
    ]);

    res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      data: {
        totalLectures,
        attendedCount,
        notAttendedCount,
        lecturesPerCourse,
        upcomingLectures
      }
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
      error: err.message
    });
  }
};
