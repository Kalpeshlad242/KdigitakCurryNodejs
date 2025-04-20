const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../controller/authMiddleware');

const analyticsController = require('../controller/analyticsController');

router.get('/', authenticate, authorizeRoles('admin'), analyticsController.getAnalytics);

module.exports = router;
