const express = require('express');
const router = express.Router(); // Corrected initialization
const instructorController = require('../controller/instructorController');
const { authenticate, authorizeRoles } = require('../controller/authMiddleware');

// Define routes
router.get('/',authenticate, authorizeRoles('admin'), instructorController.getInstructor);
router.post('/',authenticate, authorizeRoles('admin'), instructorController.createInstructor);
router.put('/:id',authenticate, authorizeRoles('admin'), instructorController.updateInstructor);
router.delete('/:id',authenticate, authorizeRoles('admin'), instructorController.deleteInstructor);

module.exports = router; // Corrected export
