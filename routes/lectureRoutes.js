const express = require('express');
const router = express.Router();
const lectureCtrl = require('../controllers/lectureController');

router.post('/', lectureCtrl.scheduleLecture);

module.exports = router;
