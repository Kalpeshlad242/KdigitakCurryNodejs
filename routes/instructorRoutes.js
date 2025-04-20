const express = require('express');
const router = express.Router(); // Corrected initialization
const instructorController = require('../controller/instructorController');

// Define routes
router.get('/', instructorController.getInstructor);
router.post('/', instructorController.createInstructor);
router.put('/:id', instructorController.updateInstructor);
router.delete('/:id', instructorController.deleteInstructor);

module.exports = router; // Corrected export
