const express = require('express');
const router = express.Router();
const lectureCtrl = require('../controller/lectureController');
const { authenticate, authorizeRoles } = require('../controller/authMiddleware');

router.post('/',authenticate, authorizeRoles('admin'), lectureCtrl.scheduleLecture);
router.get('/',authenticate, authorizeRoles('admin'), lectureCtrl.getLectures);
router.put('/:id/attendance',authenticate, authorizeRoles('admin'), lectureCtrl.updateAttendance);

module.exports = router;
