const mongoose = require('mongoose');
const isValidTime = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    return start < end;
  };
const lectureSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true,
        validate: {
          validator: function(value) {
            return isValidTime(value, this.endTime);
          },
          message: 'Start time must be earlier than end time.'
        }
      },
      endTime: {
        type: String,
        required: true,
      },
    attendanceStatus: {
        type: String,
        enum: ['Attended', 'Not Attended'],
        default: 'Not Attended'
    }
});

module.exports = mongoose.model('Lecture', lectureSchema);
