const express = require('express');
const router = express.Router();
const lectureCtrl = require('../controller/lectureController');

router.post('/', lectureCtrl.scheduleLecture);
router.get('/', lectureController.getLectures);
router.put('/:id/attendance', lectureController.updateAttendance);

module.exports = router;
