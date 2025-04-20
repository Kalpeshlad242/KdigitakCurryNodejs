const express = require('express');
const router = express.Router(); // Corrected initialization
const courseController = require('../controller/courseController');
const { authenticate, authorizeRoles } = require('../controller/authMiddleware');

// Define routes
router.get('/',authenticate, authorizeRoles('admin'), courseController.getCourse);
router.post('/',authenticate, authorizeRoles('admin'), courseController.createCourse);
router.put('/:id',authenticate, authorizeRoles('admin'), courseController.updateCourse);
router.delete('/:id',authenticate, authorizeRoles('admin'), courseController.deleteCourse);

module.exports = router; // Corrected export
