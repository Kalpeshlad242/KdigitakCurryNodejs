const express = require('express');
const router = express.Router(); // Corrected initialization
const courseController = require('../controller/courseController');

// Define routes
router.get('/', courseController.getCourse);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router; // Corrected export
