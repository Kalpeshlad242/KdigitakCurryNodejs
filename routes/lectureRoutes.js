const express = require('express');
const router = express.Router();
const lectureCtrl = require('../controller/lectureController');

router.post('/', lectureCtrl.scheduleLecture);

module.exports = router;
