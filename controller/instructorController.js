const Instructor = require('../model/Instructor');
const mongoose = require('mongoose');

// Get all instructors
exports.getInstructor = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json({ success: true, data: instructors });
  } catch (err) {
    console.error('Error fetching instructors:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch instructors', error: err.message });
  }
};

// Create new instructor
exports.createInstructor = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email',
      });
    }

    const newInstructor = new Instructor({ name, email });
    await newInstructor.save();

    res.status(201).json({ success: true, data: newInstructor });
  } catch (err) {
    console.error('Error creating instructor:', err);
    res.status(500).json({ success: false, message: 'Failed to create instructor', error: err.message });
  }
};

// Update instructor by ID
exports.updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid instructor ID' });
    }

    const updatedInstructor = await Instructor.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedInstructor) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }

    res.status(200).json({ success: true, data: updatedInstructor });
  } catch (err) {
    console.error('Error updating instructor:', err);
    res.status(500).json({ success: false, message: 'Failed to update instructor', error: err.message });
  }
};

// Delete instructor by ID
exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid instructor ID' });
    }

    const deletedInstructor = await Instructor.findByIdAndDelete(id);

    if (!deletedInstructor) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }

    res.status(200).json({ success: true, message: 'Instructor deleted successfully' });
  } catch (err) {
    console.error('Error deleting instructor:', err);
    res.status(500).json({ success: false, message: 'Failed to delete instructor', error: err.message });
  }
};
