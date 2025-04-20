const Course = require('../model/Course');
const mongoose = require('mongoose');

// Get all courses
exports.getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch courses', error: err.message });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    if (!name || !level || !description || !image) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, level, description, image',
      });
    }

    const newCourse = new Course({ name, level, description, image });
    await newCourse.save();

    res.status(201).json({ success: true, data: newCourse });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ success: false, message: 'Failed to create course', error: err.message });
  }
};

// Update course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, data: updatedCourse });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ success: false, message: 'Failed to update course', error: err.message });
  }
};

// Delete course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ success: false, message: 'Failed to delete course', error: err.message });
  }
};
