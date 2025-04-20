const Instructor = require('../model/Instructor');

// Get all courses
exports.getInstructor = async (req, res) => {
    try {
        const courses = await Instructor.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Create new course
exports.createInstructor = async (req, res) => {
    try {
        const { name, level, description, image } = req.body;
        
        if (!name || !level || !description || !image) {
            return res.status(400).json({ error: "All fields are required: name, level, description, image" });
        }

        const newCourse = new Course({ name, level, description, image });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Update course by ID
exports.updateInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Course.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ error: "Instructor not found" });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Delete course by ID
exports.deleteInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Instructor.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Instructor not found" });
        }

        res.json({ message: "Instructor deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};
