const mongoose = require('mongoose');

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
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    attendanceStatus: {
        type: String,
        enum: ['Attended', 'Not Attended'],
        default: 'Not Attended'
    }
});

module.exports = mongoose.model('Lecture', lectureSchema);
